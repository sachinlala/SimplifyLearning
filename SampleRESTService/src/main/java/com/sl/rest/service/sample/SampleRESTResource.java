package com.sl.rest.service.sample;

public class SampleRESTResource {
    private final long id;
    private final String name;

    public SampleRESTResource(final long _id, final String _name) {
        this.id = _id;
        this.name = _name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
