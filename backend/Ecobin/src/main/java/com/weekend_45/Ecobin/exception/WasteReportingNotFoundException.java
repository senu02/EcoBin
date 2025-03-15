package com.weekend_45.Ecobin.exception;

public class WasteReportingNotFoundException extends RuntimeException{
    public WasteReportingNotFoundException(Long id){
        super("Could not found the waste reporting with id: "+id);
    }
}
