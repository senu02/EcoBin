package com.weekend_45.Ecobin.controller;

import com.weekend_45.Ecobin.entity.WasteReporting;
import com.weekend_45.Ecobin.repository.WasteReportingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WasteReportingController {

    @Autowired
    private WasteReportingRepo wasteReportingRepo;

    @PostMapping("/public/addReporting")
    public String addReporting(
            @RequestParam("wasteTitle") String wasteTitle,
            @RequestParam("date") String date,
            @RequestParam("wasteType") String wasteType,
            @RequestParam("wasteWeight") Integer wasteWeight,
            @RequestParam("wasteLocation") String wasteLocation,
            @RequestParam("description") String description,
            @RequestParam("reword") Integer reword,
            @RequestParam("customerName") String customerName,
            @RequestParam("wasteImage") MultipartFile wasteImage
    ){
        try{
            WasteReporting wasteReporting = new WasteReporting();

            wasteReporting.setWasteTitle(wasteTitle);
            wasteReporting.setDate(date);
            wasteReporting.setWasteType(wasteType);
            wasteReporting.setWasteWeight(wasteWeight);
            wasteReporting.setWasteLocation(wasteLocation);
            wasteReporting.setReword(reword);
            wasteReporting.setCustomerName(customerName);
            wasteReporting.setDescription(description);

            wasteReporting.setWasteImage(wasteImage.getBytes());

            wasteReportingRepo.save(wasteReporting);

            return  "Waste reporting successfull with id: "+wasteReporting.getId();

        }catch (Exception e){
            return "Failed to save waste reporting: "+e.getMessage();
        }
    }

    @GetMapping("/public/getAllReport")
    public List<WasteReporting>getAllWasteReporting(){
        return wasteReportingRepo.findAll();
    }

    @GetMapping("/public/getReportById/{id}")
    public WasteReporting getWasteReportingById(@PathVariable Long id){
        return wasteReportingRepo.findById(id)
                .orElseThrow(()->new RuntimeException("Waste Reporting not found with Id: " + id));

    }

    @PutMapping("/public/updateReport/{id}")
    public String updateWasteReporting(
            @PathVariable Long id,
            @RequestParam("wasteTitle") String wasteTitle,
            @RequestParam("date") String date,
            @RequestParam("wasteType") String wasteType,
            @RequestParam("wasteWeight") Integer wasteWeight,
            @RequestParam("wasteLocation") String wasteLocation,
            @RequestParam("description") String description,
            @RequestParam("reword") Integer reword,
            @RequestParam("customerName") String customerName,
            @RequestParam(value = "wasteImage",required = false) MultipartFile wasteImage
    ){

        try {
            WasteReporting wasteReporting = wasteReportingRepo.findById(id)
                    .orElseThrow(()->new RuntimeException("Waste Reporting not found with id" +id));

            wasteReporting.setWasteTitle(wasteTitle);
            wasteReporting.setDate(date);
            wasteReporting.setWasteType(wasteType);
            wasteReporting.setWasteWeight(wasteWeight);
            wasteReporting.setWasteLocation(wasteLocation);
            wasteReporting.setReword(reword);
            wasteReporting.setCustomerName(customerName);
            wasteReporting.setDescription(description);

            if (wasteImage != null && !wasteImage.isEmpty()){
                wasteReporting.setWasteImage(wasteImage.getBytes());
            }

            wasteReportingRepo.save(wasteReporting);
            return "Waste Reporting update Successfully with Id: "+wasteReporting.getId();
        }catch (Exception e){
            return "Failed to update Reporting" + e.getMessage();
        }
    }

    @DeleteMapping("/public/deleteReport/{id}")
    public String deleteWasteReporting(@PathVariable Long id){
        if (wasteReportingRepo.existsById(id)){
            wasteReportingRepo.deleteById(id);
            return "Waste Reporting delete Successfully with Id: "+id;
        }else {
            return "Waste Reporting Not found Id: "+id;
        }
    }
}
