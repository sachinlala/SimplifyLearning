#!/usr/local/bin/bash
set -euo pipefail

# algorithms-js dev server helper for SimplifyLearning
# Usage:
#   ./dev.sh start    # starts the algorithms-js server in background
#   ./dev.sh stop     # stops the background server
#   ./dev.sh restart  # stop then start
#   ./dev.sh status   # prints server status
#
# Notes:
# - Serves the current algorithms-js directory (port 8080 by default)
# - Keeps a PID file at .devserver/server.pid for lifecycle management

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
JS_DIR="$SCRIPT_DIR"
STATE_DIR="$JS_DIR/.devserver"
PID_FILE="$STATE_DIR/server.pid"
LOG_FILE="$STATE_DIR/server.log"
PORT=8080

ensure_state_dir() {
  mkdir -p "$STATE_DIR"
}

is_listening() {
  # Returns 0 if something is listening on $PORT
  if command -v lsof >/dev/null 2>&1; then
    lsof -i ":$PORT" -sTCP:LISTEN >/dev/null 2>&1
  else
    # Fallback: try a quick curl
    curl -sSf "http://127.0.0.1:$PORT" >/dev/null 2>&1
  fi
}

start_js_server() {
  if [[ ! -d "$JS_DIR" ]]; then
    echo "algorithms-js directory not found at: $JS_DIR" >&2
    exit 1
  fi

  # Choose a serving command. Prefer npm script if available.
  local cmd
  if [[ -f "$JS_DIR/package.json" ]]; then
    cmd=(npm run start --silent)
  elif command -v npx >/dev/null 2>&1; then
    # Fallback to npx http-server
    cmd=(npx http-server -p "$PORT" --ext=)
  else
    # Fallback to Python http.server
    if command -v python3 >/dev/null 2>&1; then
      cmd=(python3 -m http.server "$PORT")
    else
      cmd=(python -m SimpleHTTPServer "$PORT")
    fi
  fi

  echo "Starting dev server on port $PORT ..."
  pushd "$JS_DIR" >/dev/null
  nohup "${cmd[@]}" >"$LOG_FILE" 2>&1 &
  local pid=$!
  popd >/dev/null

  echo "$pid" > "$PID_FILE"

  # Wait up to ~5s for readiness
  for i in {1..25}; do
    if is_listening; then
      echo "Dev server is up (PID $pid) on http://localhost:$PORT"
      return 0
    fi
    sleep 0.2
  done

  echo "Warning: server did not become ready within timeout. Check logs at $LOG_FILE" >&2
}

stop_server() {
  local stopped=0

  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid=$(cat "$PID_FILE" || true)
    if [[ -n "${pid:-}" ]] && kill -0 "$pid" >/dev/null 2>&1; then
      echo "Stopping PID $pid ..."
      kill "$pid" || true
      # Graceful wait up to 5s, then force
      for i in {1..25}; do
        if ! kill -0 "$pid" >/dev/null 2>&1; then
          stopped=1
          break
        fi
        sleep 0.2
      done
      if [[ $stopped -eq 0 ]]; then
        echo "Forcing stop for PID $pid ..."
        kill -9 "$pid" || true
        stopped=1
      fi
    fi
    rm -f "$PID_FILE"
  fi

  # Fallback: kill any process bound to the port
  if is_listening; then
    if command -v lsof >/dev/null 2>&1; then
      mapfile -t pids < <(lsof -ti ":$PORT" -sTCP:LISTEN || true)
      if [[ ${#pids[@]} -gt 0 ]]; then
        echo "Stopping processes on port $PORT: ${pids[*]}"
        kill "${pids[@]}" 2>/dev/null || true
      fi
    fi
  fi

  if ! is_listening; then
    echo "Dev server stopped"
  else
    echo "Warning: something is still listening on port $PORT" >&2
  fi
}

status_server() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid=$(cat "$PID_FILE" || true)
    if [[ -n "${pid:-}" ]] && kill -0 "$pid" >/dev/null 2>&1; then
      echo "Status: running (PID $pid)"
    else
      echo "Status: stale PID file present; server not running"
    fi
  else
    echo "Status: no PID file"
  fi

  if is_listening; then
    echo "Port $PORT: LISTEN"
  else
    echo "Port $PORT: not listening"
  fi

  if [[ -f "$LOG_FILE" ]]; then
    echo "Log: $LOG_FILE"
  fi
}

case "${1:-}" in
  start)
    ensure_state_dir
    if is_listening; then
      echo "Port $PORT already in use. Attempting to stop existing server first..."
      stop_server || true
      sleep 1
    fi
    start_js_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server || true
    ensure_state_dir
    start_js_server
    ;;
  status)
    status_server
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status}" >&2
    exit 1
    ;;

esac
