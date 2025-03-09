package com.weekend_45.Ecobin.controller;

import com.weekend_45.Ecobin.entity.ContactUs;
import com.weekend_45.Ecobin.exception.ContactNotFoundException;
import com.weekend_45.Ecobin.repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactRepo contactRepo;

    @PostMapping("/public/addContact")
    ContactUs addContact(@RequestBody ContactUs addContact){
        return contactRepo.save(addContact);
    }

    @GetMapping("/public/allContact")
    List<ContactUs>getAllContact(){
        return contactRepo.findAll();
    }

    @GetMapping("/public/contactId/{id}")
    ContactUs getContactById(@PathVariable Long id){
        return contactRepo.findById(id)
                .orElseThrow(()->new ContactNotFoundException(id));
    }

    @PutMapping("/public/updateContact/{id}")
    ContactUs updateContact(@RequestBody ContactUs updateContact,@PathVariable Long id){
        return contactRepo.findById(id)
                .map(contactUs -> {
                    contactUs.setName(updateContact.getName());
                    contactUs.setEmail(updateContact.getEmail());
                    contactUs.setMessage(updateContact.getMessage());
                    return contactRepo.save(contactUs);
                }).orElseThrow(()->new ContactNotFoundException(id));
    }

    @DeleteMapping("/public/deleteContact/{id}")
    String deleteContact(@PathVariable Long id){
        if (!contactRepo.existsById(id)){
            throw new ContactNotFoundException(id);
        }

        contactRepo.deleteById(id);
        return "Contact id: "+id+"has been deleted Success";
    }



}
