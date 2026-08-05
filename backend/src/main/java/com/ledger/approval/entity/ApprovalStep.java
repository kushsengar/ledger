package com.ledger.approval.entity;

import com.ledger.common.enums.ApprovalAction;
import com.ledger.common.enums.Role;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "approval_steps")
@Getter
@Setter
public class ApprovalStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Loan loan;

    private Integer stepOrder;

    @Enumerated(EnumType.STRING)
    private ApprovalAction action;

    @ManyToOne(fetch = FetchType.LAZY)
    private User actor;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Enumerated(EnumType.STRING)
    private Role requiredRole;

    private LocalDateTime actionTimestamp;
}
