package com.ledger.applicant.controller;

import com.ledger.applicant.dto.ApplicantRequest;
import com.ledger.applicant.dto.ApplicantResponse;
import com.ledger.applicant.service.ApplicantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applicants")
@RequiredArgsConstructor
public class ApplicantController {
    private final ApplicantService service;

    @PostMapping
    public ResponseEntity<ApplicantResponse> createApplicant(@RequestBody ApplicantRequest request) {
        return ResponseEntity.ok(service.createApplicant(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicantResponse> getApplicant(@PathVariable Long id) {
        return ResponseEntity.ok(service.getApplicantById(id));
    }

    @GetMapping
    public ResponseEntity<List<ApplicantResponse>> getAllApplicants() {
        return ResponseEntity.ok(service.getAllApplicants());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicantResponse> updateApplicant(@PathVariable Long id, @RequestBody ApplicantRequest request) {
        return ResponseEntity.ok(service.updateApplicant(id, request));
    }
}
