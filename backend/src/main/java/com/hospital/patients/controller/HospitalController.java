package com.hospital.patients.controller;

import com.hospital.patients.model.Patient;
import com.hospital.patients.repository.PatientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class HospitalController {

    @Autowired
    PatientsRepository patientRepository;

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients(@RequestParam(required = false) String title) {
        try {
            List<Patient> patients = new ArrayList<Patient>();

            if (title == null)
                patientRepository.findAll().forEach(patients::add);

            if (patients.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") long id) {
        try {
            Optional<Patient> tutorialData = patientRepository.findById(id);
            if (tutorialData.isPresent()) {
                return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/patients")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        try {
            Patient _patient = patientRepository
                    .save(new Patient(patient.getTitle(), patient.getName(), patient.getAge(), patient.getGender(), patient.getPhone(), patient.getAddress(), patient.getDiagnosis(), patient.getDoctor(),patient.getCovid()));
            return new ResponseEntity<>(_patient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable("id") long id, @RequestBody Patient patient) {
        Optional<Patient> patientData = patientRepository.findById(id);
        try {


            if (patientData.isPresent()) {
                Patient _patient = patientData.get();
                if (patient.getTitle() != null) {
                }
                _patient.setTitle(patient.getTitle());
                if (patient.getAddress() != null)
                    _patient.setAddress(patient.getAddress());
                if (patient.getName() != null)
                    _patient.setName(patient.getName());
                if (patient.getPhone() != null)
                    _patient.setPhone(patient.getPhone());
                if (patient.getAge() != null)
                    _patient.setAge(patient.getAge());
                if (patient.getDoctor() != null)
                    _patient.setDoctor(patient.getDoctor());
                if (patient.getDiagnosis() != null)
                    _patient.setDiagnosis(patient.getDiagnosis());
                if (patient.getGender() != null)
                    _patient.setGender(patient.getGender());
		if (patient.getCovid() != null)
                    _patient.setCovid(patient.getCovid());
                return new ResponseEntity<>(patientRepository.save(_patient), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<HttpStatus> deletePatient(@PathVariable("id") long id) {
        try {
            patientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/patients")
    public ResponseEntity<HttpStatus> deleteAllPatients() {
        try {
            patientRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
