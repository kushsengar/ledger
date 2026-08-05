package com.ledger.applicant.service;

import com.ledger.applicant.dto.ApplicantRequest;
import com.ledger.applicant.dto.ApplicantResponse;
import com.ledger.applicant.entity.Applicant;
import com.ledger.applicant.repository.ApplicantRepository;
import com.ledger.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicantService {
    private final ApplicantRepository repository;

    public ApplicantResponse createApplicant(ApplicantRequest request) {
        Applicant applicant = new Applicant();
        updateEntity(applicant, request);
        return mapToResponse(repository.save(applicant));
    }

    public ApplicantResponse getApplicantById(Long id) {
        return repository.findById(id).map(this::mapToResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found"));
    }

    public List<ApplicantResponse> getAllApplicants() {
        return repository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public ApplicantResponse updateApplicant(Long id, ApplicantRequest request) {
        Applicant applicant = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found"));
        updateEntity(applicant, request);
        return mapToResponse(repository.save(applicant));
    }

    private void updateEntity(Applicant applicant, ApplicantRequest request) {
        applicant.setFirstName(request.firstName());
        applicant.setLastName(request.lastName());
        applicant.setEmail(request.email());
        applicant.setPhone(request.phone());
        applicant.setPanNumber(request.panNumber());
        applicant.setDateOfBirth(request.dateOfBirth());
        applicant.setAddress(request.address());
        applicant.setEmploymentType(request.employmentType());
        applicant.setAnnualIncome(request.annualIncome());
        applicant.setMonthlyDebt(request.monthlyDebt());
    }

    private ApplicantResponse mapToResponse(Applicant a) {
        return new ApplicantResponse(a.getId(), a.getFirstName(), a.getLastName(), a.getEmail(), a.getPhone(), a.getPanNumber(), a.getDateOfBirth(), a.getAddress(), a.getEmploymentType(), a.getAnnualIncome(), a.getMonthlyDebt());
    }
}
