package com.weekend_45.Ecobin.controller;

import com.weekend_45.Ecobin.entity.WastePickupRequest;
import com.weekend_45.Ecobin.entity.WasteReporting;
import com.weekend_45.Ecobin.exception.WasteReportingNotFoundException;
import com.weekend_45.Ecobin.repository.WastePickupRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WastePickupRequestController {

    @Autowired
    private WastePickupRequestRepository wastePickupRequestRepository;

    @PostMapping("/public/addRequest")
    WastePickupRequest addRequest(@RequestBody WastePickupRequest addRequest){
        return wastePickupRequestRepository.save(addRequest);
    }

    @GetMapping("/public/getAllRequest")
    List<WastePickupRequest> getAllRequest(){
        return wastePickupRequestRepository.findAll();
    }

    @GetMapping("/public/getIdByRequest/{id}")
    WastePickupRequest getReportById(@PathVariable Long id){
        return wastePickupRequestRepository.findById(id)
                .orElseThrow(()->new WasteReportingNotFoundException(id));
    }

    @PutMapping("/public/updateWasteRequest/{id}")
    WastePickupRequest updateReportRequest(@RequestBody WastePickupRequest newReportRequest,@PathVariable Long id){
        return wastePickupRequestRepository.findById(id)
                .map(wastePickupRequest ->{
                    wastePickupRequest.setName(newReportRequest.getName());
                    wastePickupRequest.setAddress(newReportRequest.getAddress());
                    wastePickupRequest.setMobile(newReportRequest.getMobile());
                    wastePickupRequest.setWasteType(newReportRequest.getWasteType());
                    wastePickupRequest.setQuantity(newReportRequest.getQuantity());
                    wastePickupRequest.setFrequencyPickup(newReportRequest.getFrequencyPickup());
                    return wastePickupRequestRepository.save(wastePickupRequest);
                }).orElseThrow(()->new WasteReportingNotFoundException(id));
    }

    @DeleteMapping("/public/deleteWasteRequest/{id}")
    String deleteReportingRequest(@PathVariable Long id){
        if (!wastePickupRequestRepository.existsById(id)){
            throw  new WasteReportingNotFoundException(id);
        }

        wastePickupRequestRepository.deleteById(id);
        return "Waste reporting id "+id+"has been deleted success.";
    }



}
