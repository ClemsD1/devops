package com.example.demo.service;

import com.example.demo.model.Car;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CarService {
    private final Map<String, Car> cars = new HashMap<>();

    public CarService() {
        cars.put("11AA22", new Car("11AA22", "Ferrari", 100));
        cars.put("BB22CC", new Car("BB22CC", "BMW", 80));
    }

    public List<Car> getUnrentedCars() {
        return cars.values().stream().filter(car -> !car.isRented()).toList();
    }

    public Optional<Car> getCarByPlate(String plateNumber) {
        return Optional.ofNullable(cars.get(plateNumber));
    }

    public boolean rentCar(String plateNumber) {
        Car car = cars.get(plateNumber);
        if (car != null && !car.isRented()) {
            car.setRented(true);
            return true;
        }
        return false;
    }

    public boolean returnCar(String plateNumber) {
        Car car = cars.get(plateNumber);
        if (car != null && car.isRented()) {
            car.setRented(false);
            return true;
        }
        return false;
    }
}
