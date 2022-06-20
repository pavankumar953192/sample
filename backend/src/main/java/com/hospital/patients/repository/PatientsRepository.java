package com.hospital.patients.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.patients.model.Patient;

public interface PatientsRepository extends JpaRepository<Patient, Long> {
	List<Patient> findByDoctor(String doctor);
}
