package com.weekend_45.Ecobin.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WasteClassifierController {

    // Endpoint to classify waste
    @PostMapping("/public/classify")
    public Map<String, Object> classifyWaste(@RequestBody Map<String, String> request) {
        String base64Image = request.get("image");

        // Decode base64 image (remove the data URL part if present)
        byte[] imageBytes = Base64.getDecoder().decode(base64Image.split(",")[1]);

        // Simulate classification result and bounding box (replace this with actual model later)
        Map<String, Object> response = new HashMap<>();
        String result = runModelClassification(imageBytes);
        response.put("result", result);

        // Simulated bounding box (this should come from your model or detection logic)
        Map<String, Integer> boundingBox = new HashMap<>();
        boundingBox.put("x", 100);
        boundingBox.put("y", 150);
        boundingBox.put("width", 200);
        boundingBox.put("height", 100);

        response.put("boundingBox", boundingBox);

        return response;
    }

    // Simulated model classification (randomly returns plastic, metal, or organic)
    private String runModelClassification(byte[] imageBytes) {
        // Simulate classification logic (replace with actual model inference)
        String[] wasteTypes = {"Plastic", "Metal", "Organic","Glass","Pepar","Human"};
        return wasteTypes[new Random().nextInt(wasteTypes.length)];
    }
}

