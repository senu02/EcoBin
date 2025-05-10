package com.weekend_45.Ecobin.controller;


import com.weekend_45.Ecobin.entity.ImageDetector;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/public/detections")// Allow frontend access
public class DetectionController {

    @PostMapping
    public ResponseEntity<String> saveDetection(@RequestBody ImageDetector detection) {
        // Log the detection data
        System.out.println("Detected Object: " + detection.getObjectType() +
                ", Confidence: " + detection.getConfidence() +
                ", Time: " + detection.getTimestamp());

        // Optional: Save to DB (Future Enhancement)

        return ResponseEntity.ok("Detection received");
    }
}

