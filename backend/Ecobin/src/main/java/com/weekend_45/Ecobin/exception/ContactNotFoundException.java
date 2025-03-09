package com.weekend_45.Ecobin.exception;

public class ContactNotFoundException extends RuntimeException{
    public ContactNotFoundException(Long id){
        super("Not Found Exception Id: "+id);
    }
}
