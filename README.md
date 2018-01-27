### SimplifyLearning 
[![JavaDocs](https://img.shields.io/badge/javadocs-latest-blue.svg)](https://sachinlala.github.io/SimplifyLearning/)
[![Build](https://travis-ci.org/sachinlala/SimplifyLearning.svg)](https://travis-ci.org/sachinlala/SimplifyLearning) 
[![Coverage Status](https://coveralls.io/repos/github/sachinlala/SimplifyLearning/badge.svg?branch=master)](https://coveralls.io/github/sachinlala/SimplifyLearning?branch=master) 
<!--- [![Gitter chat](https://badges.gitter.im/sachinlala/repo.png)](https://gitter.im/SimplifyLearning) --->

An anthology of programs to simplify understanding of algorithms.

Written in Java, built with Gradle goodness, 

|Project|Objective|
|-------|----------|
|[Kihon](Kihon)|Foundational Algorithms.|
|[Kata](Kata)|Solutions to problems requiring 1+ of the core algorithms.|
|[Kumite](Kumite)|Sample app & integration w/ frameworks.|

![karate-do](karate-do.jpg)

##### How to contribute ?
Please create a new branch from 'master' and raise a pull-request once ready for review.
* [Code of Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct/)
* [Copyright License](LICENSE)

##### Tips
1. To publish from localhost to coveralls cloud, set the COVERALLS_REPO_TOKEN environment variable.
2. To update/refresh the javadocs, run `./gradlew alljavadoc` and re-commit the docs/ folder.