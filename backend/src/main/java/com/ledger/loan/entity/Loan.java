package com.ledger.loan.entity;

import com.ledger.applicant.entity.Applicant;
import com.ledger.approval.entity.ApprovalStep;
import com.ledger.common.BaseEntity;
import com.ledger.common.enums.LoanStatus;
import com.ledger.common.enums.LoanType;
import com.ledger.document.entity.Document;
import com.ledger.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "loans")
@Getter
@Setter
public class Loan extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String applicationNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    private Applicant applicant;

    @Enumerated(EnumType.STRING)
    private LoanType loanType;

    private BigDecimal requestedAmount;
    private BigDecimal approvedAmount;
    private Integer tenureMonths;
    private BigDecimal interestRate;

    @Enumerated(EnumType.STRING)
    private LoanStatus status = LoanStatus.DRAFT;

    private Integer riskScore;
    private String riskCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    private User assignedTo;

    @Version
    private Long version;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    private List<Document> documents = new ArrayList<>();

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    private List<ApprovalStep> approvalSteps = new ArrayList<>();
}
