package com.weekend_45.Ecobin.controller;

import com.weekend_45.Ecobin.entity.CollectionSchedule;
import com.weekend_45.Ecobin.repository.CollectionScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CollectionSchduleController {

    @Autowired
    private CollectionScheduleRepo collectionScheduleRepo;

    @PostMapping("/public/addSchedule")
    public String addCollection(
            @RequestParam("driverName")String driverName,
            @RequestParam("wasteType")String wasteType,
            @RequestParam("collectionDate")String collectionDate,
            @RequestParam("location")String location,
            @RequestParam("truckImage")MultipartFile truckImage
            ){
        try {
            CollectionSchedule collectionSchedule = new CollectionSchedule();
            collectionSchedule.setDriverName(driverName);
            collectionSchedule.setWasteType(wasteType);
            collectionSchedule.setCollectionDate(collectionDate);
            collectionSchedule.setLocation(location);
            collectionSchedule.setTruckImage(truckImage.getBytes());

            collectionScheduleRepo.save(collectionSchedule);

            return  "Schedule create successfull with Id: "+collectionSchedule.getId();
        }catch (Exception e){
            return "failed create successfull with Id" + e.getMessage();
        }
    }

    @GetMapping("/public/getAllSchedule")
    public List<CollectionSchedule>getAllSchedule(){
        return collectionScheduleRepo.findAll();
    }

    @GetMapping("/public/getById/{id}")
    public CollectionSchedule getCollectionScheduleById(@PathVariable Long id){
        return collectionScheduleRepo.findById(id)
                .orElseThrow(()->new RuntimeException("Collection not found with Id: " +id));
    }

    @PutMapping("/public/updateSchedule/{id}")
    public String updateSchedule(
            @PathVariable Long id,
            @RequestParam("driverName") String driverName,
            @RequestParam("wasteType") String wasteType,
            @RequestParam("collectionDate") String collectionDate,
            @RequestParam("location") String location,
            @RequestParam(value = "truckImage",required = false) MultipartFile truckImage){

                try{
                    CollectionSchedule collectionSchedule=collectionScheduleRepo.findById(id)
                            .orElseThrow(()->new RuntimeException("Schedule Not found with Id: " +id));
                    collectionSchedule.setDriverName(driverName);
                    collectionSchedule.setWasteType(wasteType);
                    collectionSchedule.setCollectionDate(collectionDate);
                    collectionSchedule.setLocation(location);

                    if (truckImage != null && !truckImage.isEmpty()){
                        collectionSchedule.setTruckImage((truckImage.getBytes()));
                    }

                    collectionScheduleRepo.save(collectionSchedule);
                    return "Schedule Update with id: "+collectionSchedule.getId();
                }catch (Exception e){
                    return "Failed to update schedule"+e.getMessage();
                }

            }
    @DeleteMapping("/public/deleteSchedule/{id}")
    public String deleteSchedule(@PathVariable Long id){
        if (collectionScheduleRepo.existsById(id)){
            collectionScheduleRepo.deleteById(id);
            return "Collection schedule delete Succesfull with Id: "+id;
        }else {
            return "Collection not found Id: " + id;
        }
    }
}
