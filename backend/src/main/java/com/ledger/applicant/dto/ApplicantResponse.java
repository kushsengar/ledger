package com.ledger.applicant.dto;
import java.math.BigDecimal;
import java.time.LocalDate;
public record ApplicantResponse(Long id, String firstName, String lastName, String email, String phone, String panNumber, LocalDate dateOfBirth, String address, String employmentType, BigDecimal annualIncome, BigDecimal monthlyDebt) {}
