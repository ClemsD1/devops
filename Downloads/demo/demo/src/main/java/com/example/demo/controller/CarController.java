package com.example.demo.controller;

import com.example.demo.model.Car;
import com.example.demo.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public List<Car> listUnrentedCars() {
        return carService.getUnrentedCars();
    }

    @GetMapping("/{plateNumber}")
    public ResponseEntity<Car> getCar(@PathVariable String plateNumber) {
        return carService.getCarByPlate(plateNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{plateNumber}")
    public ResponseEntity<String> rentOrReturnCar(
            @PathVariable String plateNumber,
            @RequestParam boolean rent) {
        boolean success = rent ? carService.rentCar(plateNumber) : carService.returnCar(plateNumber);
        return success ? ResponseEntity.ok("Operation successful") : ResponseEntity.badRequest().body("Car not available");
    }
}
