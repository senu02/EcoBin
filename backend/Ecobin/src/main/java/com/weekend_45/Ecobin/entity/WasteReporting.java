package com.weekend_45.Ecobin.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class WasteReporting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String wasteTitle;
    private String date;
    private String wasteType;
    private Integer wasteWeight;
    private String wasteLocation;
    private String description;
    private Integer reword;
    private String customerName;

    @Lob
    private byte[] wasteImage;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getReword() {
        return reword;
    }

    public void setReword(Integer reword) {
        this.reword = reword;
    }

    public byte[] getWasteImage() {
        return wasteImage;
    }

    public void setWasteImage(byte[] wasteImage) {
        this.wasteImage = wasteImage;
    }

    public String getWasteTitle() {
        return wasteTitle;
    }

    public void setWasteTitle(String wasteTitle) {
        this.wasteTitle = wasteTitle;
    }

    public String getWasteLocation() {
        return wasteLocation;
    }

    public void setWasteLocation(String wasteLocation) {
        this.wasteLocation = wasteLocation;
    }

    public String getWasteType() {
        return wasteType;
    }

    public void setWasteType(String wasteType) {
        this.wasteType = wasteType;
    }

    public Integer getWasteWeight() {
        return wasteWeight;
    }

    public void setWasteWeight(Integer wasteWeight) {
        this.wasteWeight = wasteWeight;
    }
}
