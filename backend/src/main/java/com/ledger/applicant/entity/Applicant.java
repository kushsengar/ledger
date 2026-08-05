package com.ledger.applicant.entity;

import com.ledger.common.BaseEntity;
import com.ledger.loan.entity.Loan;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "applicants")
@Getter
@Setter
public class Applicant extends BaseEntity {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String panNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String employmentType; // SALARIED/SELF_EMPLOYED
    private BigDecimal annualIncome;
    private BigDecimal monthlyDebt = BigDecimal.ZERO;

    @OneToMany(mappedBy = "applicant")
    private List<Loan> loans = new ArrayList<>();
}
