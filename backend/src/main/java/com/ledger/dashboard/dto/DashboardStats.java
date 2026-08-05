package com.ledger.dashboard.dto;
public record DashboardStats(Long totalLoans, Long pendingLoans, Long approvedLoans, Long rejectedLoans, Long escalatedLoans, Double approvalRate, Double rejectionRate, Double avgProcessingDays) {}
