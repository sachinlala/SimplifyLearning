package com.sl.examples.predicate;

public class Monk {
    private int age;
    private boolean sportsPerson;

    public Monk(int _age, boolean _sportsperson) {
        age = _age;
        sportsPerson = _sportsperson;
    }

    public int getAge() {
        return age;
    }

    public boolean isSportsPerson() {
        return sportsPerson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Monk monk = (Monk) o;
        if (age != monk.age) return false;
        return sportsPerson == monk.sportsPerson;
    }

    @Override
    public int hashCode() {
        return 31*age + (sportsPerson ? 1 : 0);
    }
}
