INSERT IGNORE INTO users (username, password, email, full_name, role, enabled, created_at, updated_at) VALUES 
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin@ledger.com', 'Admin User', 'ADMIN', 1, NOW(), NOW()),
('officer1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'officer1@ledger.com', 'Loan Officer 1', 'LOAN_OFFICER', 1, NOW(), NOW()),
('manager1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'manager1@ledger.com', 'Branch Manager 1', 'BRANCH_MANAGER', 1, NOW(), NOW()),
('risk1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'risk1@ledger.com', 'Risk Officer 1', 'CREDIT_RISK_OFFICER', 1, NOW(), NOW()),
('applicant1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'applicant1@ledger.com', 'Applicant 1', 'APPLICANT', 1, NOW(), NOW());
