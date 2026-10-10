# APEX Care Hospital — MediAI
## Complete AWS 3-Tier AI Hospital Project — Step 0 to End

> **Learning objective:** Build one connected AWS project from zero, understand every dependency, deploy it, test it, intentionally break it, troubleshoot it, optimize cost, and explain it confidently in an interview.
>
> **Hospital:** APEX Care Hospital
>
> **Project:** MediAI — AI-Powered Hospital Management & Assistant Platform
>
> **AWS main region:** `ap-south-1` (Mumbai)
>
> **Important:** This is an educational/demo application. Use fictional data only. Do not enter real patient information. The AI is informational only and must not diagnose, prescribe, or make medical decisions.

---

# 0. Before You Start

## 0.1 What we are building

The finished system is:

```text
                         USER
                          |
                          v
                      Route 53
                          |
                          v
                     CloudFront
                     /         \
                    v           v
                   S3          ALB
             Frontend files     |
                                v
                           Target Group
                            /         \
                           v           v
                         EC2-A       EC2-B
                           \           /
                            \         /
                           Node.js API
                           /         \
                          v           v
                        RDS        Bedrock
                       MySQL         AI

                 EC2 / ALB / ASG
                       |
                       v
                  CloudWatch

                  AWS API activity
                       |
                       v
                   CloudTrail
```

## 0.2 Why this project is strong for a resume

It demonstrates multiple real AWS skills in one connected system:

- VPC design
- Public/private subnetting
- Routing
- NAT
- Security Groups
- EC2
- IAM roles
- ALB
- Target Groups
- Auto Scaling
- RDS MySQL
- S3
- CloudFront
- Route 53
- ACM/HTTPS
- Bedrock
- CloudWatch
- CloudTrail
- Linux
- Node.js
- REST APIs
- Database design
- Authentication
- Failure testing
- Cost optimization

Do not say "production hospital system" on your resume. Say "production-style educational/demo application" because this project does not implement the regulatory, clinical, privacy, disaster-recovery and operational controls required for a real healthcare production workload.

---

# 1. The Starting Script — What to Say Before Your Demo

Use this script in a classroom, interview, or project presentation:

> "Hello everyone. Today I am going to demonstrate my AWS 3-tier project, APEX Care Hospital — an AI-powered hospital management and informational assistant platform.
>
> The objective of this project is not to build a real medical diagnosis system. It is an educational cloud architecture project designed to demonstrate how a secure, scalable and highly available web application can be deployed on AWS.
>
> The frontend is built using HTML, CSS and JavaScript and is stored in Amazon S3 and delivered through CloudFront.
>
> API traffic goes through an Application Load Balancer and is distributed across EC2 instances managed by an Auto Scaling Group. The EC2 servers run a Node.js and Express.js REST API.
>
> The application servers are placed in private application subnets, while Amazon RDS MySQL is placed in private database subnets. RDS is never directly exposed to the Internet.
>
> For AI functionality, the Node.js backend communicates with Amazon Bedrock using an EC2 IAM role instead of hard-coded AWS access keys.
>
> Route 53 provides DNS, ACM provides TLS certificates, CloudWatch provides monitoring and alarms, and CloudTrail provides AWS API auditing.
>
> I will also demonstrate failure testing: what happens when an EC2 instance fails, when an ALB target becomes unhealthy, when CPU increases, when database connectivity is broken, and when Bedrock permissions are removed.
>
> Finally, I will explain the security model, cost optimization and cleanup process."

This is your **opening script**. Learn the architecture first; do not memorize every AWS console click.

---

# 2. What Problem Does the Project Solve?

A fictional hospital wants a web platform where users can:

- See hospital departments
- See doctors
- Register/login
- Book appointments
- Contact the hospital
- Ask an AI assistant general hospital-information questions

The organization also wants:

- Secure networking
- Database isolation
- High availability
- Automatic scaling
- HTTPS
- Monitoring
- Auditing
- CDN delivery
- AI integration

AWS provides the infrastructure required to demonstrate all of these.

---

# 3. Architecture — Simple Explanation

## Presentation tier

```text
S3 + CloudFront + Route 53
```

Purpose: deliver the website.

## Application tier

```text
ALB + Target Group + ASG + EC2 + Node.js/Express
```

Purpose: run APIs and business logic.

## Data tier

```text
RDS MySQL
```

Purpose: store application data.

## AI integration

```text
Node.js -> Bedrock
```

Purpose: generate informational AI responses.

---

# 4. Fixed Project Values

Do not change these during the project.

## Region

```text
ap-south-1
```

## VPC

```text
mediai-vpc
10.0.0.0/16
```

## Subnets

```text
mediai-public-subnet-a       10.0.1.0/24
mediai-public-subnet-b       10.0.2.0/24

mediai-app-private-subnet-a  10.0.11.0/24
mediai-app-private-subnet-b  10.0.12.0/24

mediai-db-private-subnet-a   10.0.21.0/24
mediai-db-private-subnet-b   10.0.22.0/24
```

## Security Groups

```text
mediai-alb-sg
mediai-app-sg
mediai-db-sg
```

## ALB

```text
mediai-alb
```

## Target Group

```text
mediai-api-tg
```

## Launch Template

```text
mediai-launch-template
```

## ASG

```text
mediai-asg
```

## RDS

```text
mediai-rds
```

## Database

```text
mediai_hospital
```

## Node.js

```text
3000
```

## MySQL

```text
3306
```

---

# 5. Dependency Order

Follow this order:

```text
Step 0  Prerequisites
Step 1  AWS account/billing/IAM preparation
Step 2  VPC
Step 3  Subnets
Step 4  Internet Gateway
Step 5  Route Tables
Step 6  NAT Gateway
Step 7  Security Groups
Step 8  RDS
Step 9  Database schema/data
Step 10 Backend development
Step 11 Backend local test
Step 12 EC2
Step 13 Backend deployment to EC2
Step 14 ALB + Target Group
Step 15 Launch Template
Step 16 ASG
Step 17 High-availability test
Step 18 S3
Step 19 CloudFront
Step 20 Backend API integration
Step 21 ACM
Step 22 Route 53
Step 23 HTTPS
Step 24 Bedrock
Step 25 CloudWatch
Step 26 CloudTrail
Step 27 End-to-end testing
Step 28 Failure testing
Step 29 Security testing
Step 30 Cost optimization
Step 31 Cleanup
Step 32 Resume/interview preparation
```

The reason for this order is simple: later resources depend on earlier resources.

---

# 6. Step 0 — Prerequisites

## What are we doing?

Preparing your laptop and AWS account.

## Why?

If prerequisites are missing, later steps fail for reasons unrelated to the actual architecture.

## Install locally

- Git
- Node.js 22 LTS
- npm
- VS Code
- MySQL client
- AWS CLI v2 (optional)

Verify:

```bash
git --version
node -v
npm -v
aws --version
mysql --version
```

Expected:

```text
git version ...
v22.x.x
10.x.x
aws-cli/2.x.x
mysql ...
```

Exact patch versions may differ.

## Common error

`node is not recognized`

### Fix

Install Node.js, reopen the terminal and run:

```bash
node -v
```

---

# 7. Step 1 — AWS Account Preparation

## What?

Prepare the AWS account.

## Why?

AWS resources can create charges. Security and billing must be prepared first.

### 1. Enable MFA

AWS Console:

```text
AWS Console
-> Account
-> Security credentials
-> MFA
```

Use MFA on the root account.

### 2. Do not use root for daily work

Create/use an administrative identity through IAM Identity Center or another controlled administrative mechanism.

### 3. Create a billing alarm/budget

Use:

```text
AWS Console
-> Billing and Cost Management
-> Budgets
```

Create a small monthly budget appropriate for your learning account.

### 4. Confirm region

Select:

```text
Asia Pacific (Mumbai)
ap-south-1
```

---

# 8. Step 2 — Create the VPC

## Purpose

The VPC is our private AWS network.

## Dependency

AWS account.

## Console

```text
AWS Console
-> VPC
-> Your VPCs
-> Create VPC
```

Choose:

```text
Resources to create: VPC only
Name: mediai-vpc
IPv4 CIDR: 10.0.0.0/16
IPv6: No
Tenancy: Default
```

Create.

## Expected output

You should see:

```text
mediai-vpc
10.0.0.0/16
Available
```

## Validation

Select the VPC and verify:

```text
IPv4 CIDR = 10.0.0.0/16
State = Available
```

## Common error

CIDR overlaps another network.

### Fix

For this learning project, use exactly:

```text
10.0.0.0/16
```

unless your account already has a conflicting connected network.

---

# 9. Step 3 — Create Six Subnets

We need six subnets because we want three logical tiers across two Availability Zones.

## AZ selection

Choose two AZs in Mumbai, for example:

```text
ap-south-1a
ap-south-1b
```

If your console exposes different usable AZ suffixes, select any two distinct AZs in `ap-south-1`.

## Subnet A — Public

```text
Name: mediai-public-subnet-a
VPC: mediai-vpc
AZ: ap-south-1a
CIDR: 10.0.1.0/24
```

## Subnet B — Public

```text
Name: mediai-public-subnet-b
VPC: mediai-vpc
AZ: ap-south-1b
CIDR: 10.0.2.0/24
```

## App A

```text
Name: mediai-app-private-subnet-a
AZ: ap-south-1a
CIDR: 10.0.11.0/24
```

## App B

```text
Name: mediai-app-private-subnet-b
AZ: ap-south-1b
CIDR: 10.0.12.0/24
```

## DB A

```text
Name: mediai-db-private-subnet-a
AZ: ap-south-1a
CIDR: 10.0.21.0/24
```

## DB B

```text
Name: mediai-db-private-subnet-b
AZ: ap-south-1b
CIDR: 10.0.22.0/24
```

## Expected

Six available subnets.

## Validation

```text
Public A       10.0.1.0/24
Public B       10.0.2.0/24
App A          10.0.11.0/24
App B          10.0.12.0/24
DB A           10.0.21.0/24
DB B           10.0.22.0/24
```

---

# 10. Step 4 — Internet Gateway

## What?

An Internet Gateway connects a VPC to the Internet.

## Console

```text
VPC
-> Internet Gateways
-> Create internet gateway
```

Name:

```text
mediai-igw
```

Then:

```text
Actions
-> Attach to VPC
-> mediai-vpc
```

## Expected

```text
State: Attached
VPC: mediai-vpc
```

---

# 11. Step 5 — Route Tables

We need at least:

```text
mediai-public-rt
mediai-app-private-rt
mediai-db-private-rt
```

## Public route table

Create:

```text
Name: mediai-public-rt
VPC: mediai-vpc
```

Add route:

```text
Destination: 0.0.0.0/0
Target: mediai-igw
```

Associate:

```text
mediai-public-subnet-a
mediai-public-subnet-b
```

### Meaning

```text
0.0.0.0/0
     |
     v
Internet Gateway
```

---

# 12. Step 6 — NAT Gateway

## Why?

Private application servers may need outbound Internet connectivity while remaining private.

## Important cost warning

NAT Gateway is one of the resources that can create meaningful charges. For a learning account, monitor it carefully and delete it when finished.

## Console

```text
VPC
-> NAT Gateways
-> Create NAT Gateway
```

Use:

```text
Name: mediai-nat-a
Subnet: mediai-public-subnet-a
Connectivity type: Public
Elastic IP: Allocate
```

Wait until:

```text
State = Available
```

## Private app route table

Create:

```text
mediai-app-private-rt
```

Route:

```text
0.0.0.0/0 -> mediai-nat-a
```

Associate:

```text
mediai-app-private-subnet-a
mediai-app-private-subnet-b
```

## Database route table

Create:

```text
mediai-db-private-rt
```

Do not add an Internet default route.

Associate:

```text
mediai-db-private-subnet-a
mediai-db-private-subnet-b
```

## Key concept

Application:

```text
Private EC2
    |
    v
NAT
    |
    v
Internet
```

Database:

```text
RDS
  |
  X
Internet
```

---

# 13. Step 7 — Security Groups

Create three security groups.

## 13.1 ALB SG

```text
Name: mediai-alb-sg
VPC: mediai-vpc
```

Inbound:

```text
TCP 80  0.0.0.0/0
TCP 443 0.0.0.0/0
```

Outbound:

```text
All traffic
```

## 13.2 App SG

```text
Name: mediai-app-sg
VPC: mediai-vpc
```

Inbound:

```text
TCP 3000
Source: mediai-alb-sg
```

For administrative access, prefer Systems Manager. If you temporarily use SSH during learning, restrict TCP 22 to your IP only; never open SSH to the entire Internet unnecessarily.

## 13.3 DB SG

```text
Name: mediai-db-sg
VPC: mediai-vpc
```

Inbound:

```text
TCP 3306
Source: mediai-app-sg
```

This creates:

```text
Internet
   |
   v
ALB-SG
   |
   v
APP-SG
   |
   v
DB-SG
```

---

# 14. Step 8 — Create RDS MySQL

## Purpose

Store application data.

## Dependency

VPC + DB subnets + DB security group.

## Create DB subnet group first

Console:

```text
RDS
-> Subnet groups
-> Create DB subnet group
```

Name:

```text
mediai-db-subnet-group
```

VPC:

```text
mediai-vpc
```

AZs:

```text
Two selected AZs
```

Subnets:

```text
mediai-db-private-subnet-a
mediai-db-private-subnet-b
```

## Create RDS

```text
RDS
-> Databases
-> Create database
```

Choose MySQL.

Use a learning-sized configuration available in your account/region.

Identifier:

```text
mediai-rds
```

Database:

```text
mediai_hospital
```

Master username:

```text
mediaiadmin
```

Password:

Generate your own strong password.

Do NOT copy a password into Git.

Connectivity:

```text
VPC: mediai-vpc
DB subnet group: mediai-db-subnet-group
Public access: No
Security group: mediai-db-sg
Port: 3306
```

## Expected

RDS becomes:

```text
Available
```

## Record

Copy the RDS endpoint.

Example format:

```text
mediai-rds.xxxxx.ap-south-1.rds.amazonaws.com
```

Do not use this example as your actual endpoint.

## Important

A private RDS instance is reachable from resources with network connectivity inside the VPC, not directly from the public Internet.

---

# 15. Step 9 — Database Setup

Install/use MySQL client.

Connect from an application EC2 later, or from a controlled administrative path. Do not make RDS public merely to simplify learning.

Command pattern:

```bash
mysql -h <YOUR_RDS_ENDPOINT> -P 3306 -u mediaiadmin -p
```

Enter the password interactively.

Then execute the supplied:

```text
code/database/schema.sql
```

The schema creates:

```text
users
patients
departments
doctors
appointments
ai_chat_history
contact_messages
hospital_contact
```

Validation:

```sql
USE mediai_hospital;
SHOW TABLES;
SELECT * FROM departments;
SELECT * FROM doctors;
```

Expected:

Departments and fictional doctors appear.

---

# 16. Step 10 — Backend Development

Go to:

```text
code/backend
```

Install:

```bash
npm install
```

Create a real `.env` from `.env.example`.

Do NOT commit `.env`.

Required values:

```text
NODE_ENV=production
PORT=3000
AWS_REGION=ap-south-1
BEDROCK_MODEL_ID=<YOUR_AVAILABLE_BEDROCK_MODEL_OR_INFERENCE_PROFILE_ID>
DB_HOST=<YOUR_RDS_ENDPOINT>
DB_PORT=3306
DB_NAME=mediai_hospital
DB_USER=<YOUR_DB_USER>
DB_PASSWORD=<YOUR_DB_PASSWORD>
JWT_SECRET=<LONG_RANDOM_SECRET>
CORS_ORIGIN=<YOUR_FRONTEND_ORIGIN>
```

## Generate JWT secret

Linux/macOS:

```bash
openssl rand -hex 32
```

PowerShell:

```powershell
[Convert]::ToHexString((1..32 | ForEach-Object {Get-Random -Maximum 256}))
```

Use the generated value as `JWT_SECRET`.

Never put AWS access keys here.

---

# 17. Backend Local Test

The database must be reachable for the health endpoint because our health check verifies DB connectivity.

Start:

```bash
npm start
```

Expected:

```text
APEX Care Hospital API listening on port 3000
```

Test:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{"status":"healthy"}
```

Also test:

```bash
curl http://localhost:3000/api/departments
```

Expected:

JSON array containing departments.

---

# 18. Step 11 — Test Authentication

Register:

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo User","email":"demo@example.com","password":"ChangeMe123!"}'
```

Expected:

```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@example.com"
  }
}
```

The exact ID depends on your database.

Login:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"ChangeMe123!"}'
```

Save the returned token for API testing.

---

# 19. Step 12 — Create EC2 IAM Role

## Purpose

Allow EC2 to access AWS services without storing AWS access keys.

Create an IAM role for EC2.

Required permissions should be least privilege.

At minimum, Bedrock requires permission to invoke the chosen model. The Bedrock Converse API requires `bedrock:InvokeModel`. 

For learning, attach a policy restricted to the model resource if the selected model/resource supports resource-level restriction. If your selected model/inference profile requires broader resource specification, follow the model's IAM documentation rather than blindly using `Resource:"*"`.

CloudWatch permissions will be added according to the logging method we configure.

Systems Manager permissions can be included if you use SSM for administration.

---

# 20. Step 13 — Launch EC2

Use Amazon Linux 2023.

AWS supports Node.js 20, 22 and 24 packages on Amazon Linux 2023; we will use Node.js 22 for this project.

Create an EC2 instance in:

```text
mediai-app-private-subnet-a
```

Configuration:

```text
AMI: Amazon Linux 2023
Subnet: mediai-app-private-subnet-a
Auto-assign public IP: Disabled
Security Group: mediai-app-sg
IAM Role: MediAI EC2 role
```

For SSH-based learning, a public IP is not available in the private subnet. Prefer Systems Manager Session Manager.

---

# 21. Step 14 — Connect Using Systems Manager

If SSM is configured:

```text
EC2
-> Instances
-> Select instance
-> Connect
-> Session Manager
-> Connect
```

This is preferable to exposing SSH publicly.

Validate:

```bash
whoami
uname -a
cat /etc/os-release
```

Expected:

Amazon Linux 2023 details.

---

# 22. Step 15 — Install Node.js and Git on EC2

```bash
sudo dnf update -y
sudo dnf install -y git nodejs22
node -v
npm -v
git --version
```

Expected:

```text
v22.x.x
npm ...
git version ...
```

If `nodejs22` is not available in the exact AL2023 image/package state, run:

```bash
dnf list nodejs\*
```

and use the supported Node.js package exposed by your AL2023 image. Do not mix random third-party repositories into the production-style demo without a reason.

---

# 23. Step 16 — Deploy Backend

Copy the backend code to EC2.

For learning, Git is preferred.

Example:

```bash
cd /opt
sudo mkdir -p mediai-hospital
sudo chown $USER:$USER mediai-hospital
cd mediai-hospital
```

Copy your backend files here.

Then:

```bash
cd /opt/mediai-hospital/backend
npm install
```

Create `.env`:

```bash
nano .env
```

Set:

```text
NODE_ENV=production
PORT=3000
AWS_REGION=ap-south-1
BEDROCK_MODEL_ID=<YOUR_AVAILABLE_MODEL>
DB_HOST=<YOUR_RDS_ENDPOINT>
DB_PORT=3306
DB_NAME=mediai_hospital
DB_USER=<YOUR_DB_USER>
DB_PASSWORD=<YOUR_DB_PASSWORD>
JWT_SECRET=<YOUR_RANDOM_SECRET>
CORS_ORIGIN=<YOUR_FRONTEND_ORIGIN>
```

Test:

```bash
npm start
```

From the EC2 machine:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{"status":"healthy"}
```

---

# 24. Step 17 — Process Management with PM2

Install:

```bash
sudo npm install -g pm2
```

Start:

```bash
cd /opt/mediai-hospital/backend
pm2 start server.js --name mediai-api
pm2 status
```

Expected:

```text
mediai-api    online
```

Save:

```bash
pm2 save
```

Configure startup:

```bash
pm2 startup
```

PM2 will print a command. Run that command exactly as printed, then:

```bash
pm2 save
```

Validate:

```bash
pm2 logs mediai-api --lines 50
```

---

# 25. Step 18 — Test Network Connectivity to RDS

From EC2:

```bash
nc -vz <YOUR_RDS_ENDPOINT> 3306
```

Expected:

```text
succeeded
```

If it fails, check:

1. RDS status
2. RDS subnet group
3. DB security group
4. EC2 security group
5. Route tables
6. DNS resolution
7. DB credentials

Do NOT make RDS public as the first troubleshooting step.

---

# 26. Step 19 — Create Target Group

Console:

```text
EC2
-> Target Groups
-> Create target group
```

Choose:

```text
Target type: Instances
Name: mediai-api-tg
Protocol: HTTP
Port: 3000
VPC: mediai-vpc
Health check protocol: HTTP
Health check path: /api/health
```

Register your initial EC2 instance.

## Expected

Initially it may show:

```text
initial
```

After successful health checks:

```text
healthy
```

---

# 27. Step 20 — Create Application Load Balancer

Console:

```text
EC2
-> Load Balancers
-> Create Load Balancer
-> Application Load Balancer
```

Name:

```text
mediai-alb
```

Scheme:

```text
Internet-facing
```

IP type:

```text
IPv4
```

Subnets:

```text
mediai-public-subnet-a
mediai-public-subnet-b
```

Security group:

```text
mediai-alb-sg
```

Listener:

```text
HTTP 80
```

Forward to:

```text
mediai-api-tg
```

## Test

Copy ALB DNS name.

Example:

```text
mediai-alb-xxxx.ap-south-1.elb.amazonaws.com
```

Open:

```text
http://<ALB-DNS>/api/health
```

Expected:

```json
{"status":"healthy"}
```

---

# 28. ALB Status Codes — Interview Knowledge

## 200

Request successfully reached the application.

## 502

Often means the load balancer could not successfully communicate with the target application.

Check:

```text
EC2 application running?
Port 3000?
Security Group?
Target port?
Application response?
```

## 503

Often indicates no healthy target is available.

Check:

```text
Target group
Health checks
EC2 status
Application status
Security groups
```

---

# 29. Step 21 — Create Launch Template

Create:

```text
mediai-launch-template
```

Include:

- Amazon Linux 2023 AMI
- Instance type suitable for learning
- IAM role
- `mediai-app-sg`
- EBS root volume
- User data

The launch template is the blueprint for new EC2 instances.

---

# 30. Step 22 — User Data

Use the supplied:

```text
code/deployment/user-data.sh
```

The production-style improvement is to retrieve application code/configuration securely rather than embedding secrets in User Data.

For this learning project, the first EC2 can be manually configured to understand the process; then the Launch Template/ASG phase should automate the repeatable installation/deployment process.

---

# 31. Step 23 — Create Auto Scaling Group

Create:

```text
mediai-asg
```

Use:

```text
Launch Template:
mediai-launch-template

VPC:
mediai-vpc

Subnets:
mediai-app-private-subnet-a
mediai-app-private-subnet-b
```

Capacity:

```text
Minimum: 2
Desired: 2
Maximum: 4
```

Attach:

```text
mediai-api-tg
```

Health check:

```text
EC2 + ELB health checks
```

## Expected

Two instances are running across the two AZs.

---

# 32. Step 24 — High Availability Test

Stop one EC2 instance.

Expected sequence:

```text
EC2 becomes unavailable
       |
       v
ALB health check fails
       |
       v
Target becomes unhealthy
       |
       v
ALB stops sending traffic there
       |
       v
ASG detects reduced healthy capacity
       |
       v
Replacement EC2 launches
       |
       v
Application starts
       |
       v
Target becomes healthy
```

Test the ALB repeatedly:

```bash
curl http://<ALB-DNS>/api/health
```

Expected:

```json
{"status":"healthy"}
```

The exact replacement timing depends on AWS health checks and instance startup.

---

# 33. Step 25 — S3 Frontend

Create an S3 bucket.

Bucket names must be globally unique.

Use:

```text
mediai-frontend-<unique-value>
```

Example:

```text
mediai-frontend-123456789
```

Do not copy this example if it is already taken.

Upload:

```text
code/frontend/
```

Important:

Do not unnecessarily make the bucket public.

Keep Block Public Access enabled.

---

# 34. Step 26 — CloudFront

Create a CloudFront distribution.

Origin:

```text
S3 bucket
```

Use Origin Access Control.

The goal is:

```text
Internet
   |
   v
CloudFront
   |
   v
S3
```

not:

```text
Internet
   |
   v
Public S3 bucket
```

Configure:

```text
Viewer protocol:
Redirect HTTP to HTTPS
```

For the initial learning setup, use the CloudFront generated domain.

---

# 35. Step 27 — CloudFront API Behavior

To keep the requested architecture:

```text
CloudFront
 |
 +-- Default -> S3
 |
 +-- /api/* -> ALB
```

Create an additional origin:

```text
ALB DNS name
```

Create behavior:

```text
Path:
 /api/*
Origin:
 mediai-alb
```

Forward methods required by the APIs:

```text
GET
HEAD
OPTIONS
POST
PUT
DELETE
```

Configure appropriate caching:

```text
/api/*
Caching disabled or very low caching
```

because API responses can be user-specific.

---

# 36. Step 28 — Frontend API Configuration

The frontend uses:

```text
const API_BASE = "/api";
```

This is intentional.

It means the browser calls:

```text
https://YOUR_DOMAIN_NAME/api/doctors
```

CloudFront routes:

```text
/api/*
```

to the ALB.

Everything else goes to S3.

This creates a clean same-domain architecture and reduces CORS complexity.

---

# 37. Step 29 — ACM

You need HTTPS.

There are two certificates in a full setup:

## CloudFront certificate

Request/use the certificate in:

```text
us-east-1
```

CloudFront requires ACM certificates used for viewer HTTPS to be in US East (N. Virginia).

## ALB certificate

The ALB certificate is regional:

```text
ap-south-1
```

if you use HTTPS directly on the ALB.

For the first learning milestone, get CloudFront HTTPS working first. Then add HTTPS to the ALB if you want end-to-end encryption from CloudFront to ALB.

---

# 38. Step 30 — Route 53

You need a domain you control.

Use:

```text
YOUR_DOMAIN_NAME
```

Create/find the hosted zone.

Create an alias record pointing the domain to CloudFront.

Example concept:

```text
YOUR_DOMAIN_NAME
       |
       v
CloudFront
```

Do not invent a real domain name in your documentation.

---

# 39. Step 31 — HTTPS

Expected final request:

```text
https://YOUR_DOMAIN_NAME
```

Browser:

```text
HTTPS
  |
  v
CloudFront
  |
  +--> S3
  |
  +--> ALB
```

The browser should show a valid certificate.

---

# 40. Step 32 — Amazon Bedrock

## What is Bedrock?

Amazon Bedrock provides access to foundation models through AWS APIs.

For new applications, AWS documents the Bedrock Runtime endpoint and recommends the Converse API for a consistent model interface.

Our Node.js service uses:

```text
@aws-sdk/client-bedrock-runtime
```

and:

```text
ConverseCommand
```

## Important

There is no "Bedrock API key" that should be pasted into the frontend.

The EC2 instance uses an IAM role.

Flow:

```text
EC2
 |
 | IAM role
 v
Bedrock Runtime
 |
 v
Model
```

## Enable model access

Go to:

```text
Amazon Bedrock
-> Model access / available models
```

The exact console wording can vary by AWS account and current Bedrock model availability.

Select a text model available to your account/region.

Set:

```text
BEDROCK_MODEL_ID=<YOUR_AVAILABLE_MODEL_OR_INFERENCE_PROFILE_ID>
```

Do not guess the model ID.

---

# 41. Bedrock IAM

The application role needs permission to invoke the selected model.

Conceptual permission:

```json
{
  "Effect": "Allow",
  "Action": [
    "bedrock:InvokeModel"
  ],
  "Resource": "<YOUR_SELECTED_MODEL_OR_SUPPORTED_RESOURCE>"
}
```

Use the most restrictive resource supported by the model/inference profile.

The AWS Bedrock Converse API requires `bedrock:InvokeModel`.

---

# 42. Step 33 — Test Bedrock from EC2

After `.env` contains the model ID:

Restart:

```bash
pm2 restart mediai-api --update-env
```

Test:

```bash
curl -X POST http://<ALB-DNS>/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What departments are available at APEX Care Hospital?"}'
```

Expected:

```json
{
  "reply":"..."
}
```

The response should remain within the safe informational scope.

---

# 43. Step 34 — CloudWatch

Monitor:

```text
EC2
ALB
ASG
Application logs
CPU
Health
```

Create a CPU alarm:

```text
Metric:
EC2 CPUUtilization

Threshold:
Greater than 70%

Evaluation:
Choose a sensible learning window such as multiple consecutive periods
```

Do not blindly use one datapoint for production decisions.

---

# 44. Application Logs

PM2:

```bash
pm2 logs mediai-api
```

For production-style centralized logging, configure CloudWatch Agent or another supported log pipeline.

The goal:

```text
EC2
 |
 v
Application logs
 |
 v
CloudWatch Logs
```

---

# 45. CloudWatch + Auto Scaling

A common architecture:

```text
CPU increases
     |
     v
CloudWatch
     |
     v
Alarm
     |
     v
ASG scaling policy
     |
     v
New EC2
```

This demonstrates automatic scaling.

---

# 46. Step 35 — CloudTrail

CloudTrail answers questions such as:

```text
Who changed a security group?
Who launched an EC2 instance?
Who changed an S3 resource?
Who modified an IAM policy?
```

Console:

```text
CloudTrail
-> Event history
```

Search by:

```text
Event name
Resource
Username/identity
Time
```

For longer retention/audit requirements, configure a trail to S3 with appropriate security controls.

---

# 47. Step 36 — End-to-End Testing

## Test 1 — VPC

Verify:

```text
mediai-vpc
10.0.0.0/16
```

PASS:

VPC is available.

---

## Test 2 — Subnets

Verify all six exist.

PASS:

All six have correct CIDRs and AZs.

---

## Test 3 — NAT

From private EC2:

```bash
curl -I https://aws.amazon.com
```

PASS:

HTTP response is received.

FAIL:

Check private route table -> NAT -> public route table -> IGW.

---

## Test 4 — Node.js

```bash
node -v
npm -v
```

PASS:

Expected versions displayed.

---

## Test 5 — Backend

```bash
curl http://localhost:3000/api/health
```

PASS:

```json
{"status":"healthy"}
```

---

## Test 6 — RDS

```bash
nc -vz <RDS_ENDPOINT> 3306
```

PASS:

Connection succeeds.

---

## Test 7 — ALB

```bash
curl http://<ALB_DNS>/api/health
```

PASS:

Healthy JSON response.

---

## Test 8 — Target Group

Console:

```text
EC2
-> Target Groups
-> mediai-api-tg
-> Targets
```

PASS:

Targets are healthy.

---

## Test 9 — ASG

Verify:

```text
Minimum 2
Desired 2
Maximum 4
```

PASS:

Two instances running.

---

## Test 10 — S3

Verify frontend files exist.

PASS:

Objects visible in bucket.

---

## Test 11 — CloudFront

Open CloudFront domain.

PASS:

APEX Care Hospital homepage loads.

---

## Test 12 — API through CloudFront

Open:

```text
https://<CLOUDFRONT_DOMAIN>/api/health
```

PASS:

```json
{"status":"healthy"}
```

---

## Test 13 — Authentication

Register/login.

PASS:

JWT returned.

---

## Test 14 — Appointment

Login and submit appointment.

PASS:

Appointment appears in database.

---

## Test 15 — Bedrock

Ask:

```text
What departments are available?
```

PASS:

Informational response.

---

## Test 16 — HTTPS

Open:

```text
https://YOUR_DOMAIN_NAME
```

PASS:

Valid certificate.

---

# 48. Failure Test 1 — Stop EC2

Stop one instance.

Observe:

```text
Target -> unhealthy
```

Then:

```text
ASG -> replacement
```

Verify:

```bash
curl https://YOUR_DOMAIN_NAME/api/health
```

Expected:

Still healthy.

---

# 49. Failure Test 2 — Break Application

On an EC2 instance:

```bash
pm2 stop mediai-api
```

Target should become unhealthy after health-check evaluation.

Observe:

```text
ALB -> unhealthy target
```

Restore:

```bash
pm2 start mediai-api
```

Expected:

Target returns to healthy.

---

# 50. Failure Test 3 — CPU

Generate controlled CPU load on a test instance.

Use a short controlled test only.

Example:

```bash
timeout 60s bash -c 'while true; do :; done'
```

Observe:

```text
EC2 CPU
   |
   v
CloudWatch
   |
   v
Alarm
```

If scaling policy is configured:

```text
ASG
   |
   v
New EC2
```

Do not leave stress processes running.

---

# 51. Failure Test 4 — Database Security Group

Temporarily remove the:

```text
3306 from mediai-app-sg
```

Observe application failure.

Test:

```bash
nc -vz <RDS_ENDPOINT> 3306
```

Expected:

Connection fails.

Restore the rule.

Then validate:

```bash
curl http://localhost:3000/api/health
```

Expected:

```json
{"status":"healthy"}
```

---

# 52. Failure Test 5 — Bedrock AccessDenied

Temporarily remove the Bedrock invocation permission from the EC2 role.

Test:

```bash
curl -X POST http://<ALB_DNS>/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are the hospital timings?"}'
```

Expected:

AI request fails.

Application logs should show an authorization-related AWS error.

Restore permission and restart if required.

---

# 53. Troubleshooting Matrix

| Symptom | Check | Fix |
|---|---|---|
| EC2 unavailable | Instance state | Start/replace |
| SSM unavailable | IAM/SSM/network | Fix role/network |
| Node missing | `node -v` | Install supported package |
| npm fails | Node/npm/network | Check package manager/network |
| API down | `pm2 status` | Start/restart |
| Port 3000 fails | `ss -lntp` | Fix application |
| ALB 502 | App/port/SG | Correct target connectivity |
| ALB 503 | Target health | Fix health check |
| RDS timeout | SG/routes/DNS | Fix DB path |
| AccessDenied | IAM | Add least-privilege permission |
| S3 403 | OAC/bucket policy | Correct CloudFront OAC |
| CloudFront 403 | Origin/OAC | Fix origin access |
| Old frontend | Cache | Invalidate |
| DNS failure | Route 53 | Verify record/domain |
| ACM pending | DNS validation | Complete validation |
| Bedrock denied | IAM/model access | Correct role/model access |
| CloudWatch logs absent | Agent/permissions | Fix log configuration |
| ASG instance bad | Launch Template/User Data | Review logs |

---

# 54. Important Linux Troubleshooting Commands

## Check listening ports

```bash
sudo ss -lntp
```

Look for:

```text
:3000
```

## Check process

```bash
ps aux | grep node
```

## PM2

```bash
pm2 status
pm2 logs mediai-api --lines 100
```

## Test local API

```bash
curl http://localhost:3000/api/health
```

## DNS

```bash
getent hosts <RDS_ENDPOINT>
```

## Network port

```bash
nc -vz <HOST> <PORT>
```

## Environment

```bash
printenv | grep -E 'NODE_ENV|AWS_REGION|DB_HOST|DB_NAME|BEDROCK_MODEL_ID'
```

Never print passwords in troubleshooting output.

---

# 55. Security Design

## Principle 1 — Least privilege

Give each component only what it needs.

## Principle 2 — Private application tier

EC2 is not directly exposed to the Internet.

## Principle 3 — Private database

RDS is not public.

## Principle 4 — SG chaining

```text
ALB-SG
  |
  v
APP-SG
  |
  v
DB-SG
```

## Principle 5 — IAM roles

EC2 uses an IAM role.

No permanent AWS access key in code.

## Principle 6 — HTTPS

Use ACM + CloudFront.

## Principle 7 — S3 private access

Use CloudFront Origin Access Control.

## Principle 8 — Secrets

Do not put:

```text
DB password
JWT secret
AWS access keys
```

in frontend files or Git.

For a more advanced production implementation, move secrets from `.env` to AWS Secrets Manager/SSM Parameter Store and grant the EC2 role only the required secret-read permissions.

---

# 56. AI Security

The AI receives only the user message required for the request.

The system prompt explicitly instructs it:

- No diagnosis
- No prescribing
- No medical decisions
- No confidential patient information
- Encourage professional medical help for medical concerns

Do not send real patient records into this demo.

---

# 57. Cost Optimization

## Resources that can incur charges

- EC2
- RDS
- ALB
- NAT Gateway
- Elastic IP
- S3
- CloudFront
- Route 53
- CloudWatch
- CloudTrail storage
- Bedrock

Exact prices change and depend on region, configuration and usage. Always verify current AWS pricing before budgeting.

## Learning-environment optimization

### 1. Do not leave resources running

Delete the environment after practice.

### 2. RDS

Use a small learning configuration.

### 3. EC2

Use small instance types suitable for testing.

### 4. ASG

During development, temporarily use:

```text
Min 1
Desired 1
Max 2
```

only if you understand that this deviates from the final HA configuration.

For the final project demonstration:

```text
Min 2
Desired 2
Max 4
```

### 5. NAT Gateway

Monitor carefully because it can create charges.

### 6. CloudFront

Avoid unnecessary invalidations.

### 7. Bedrock

Keep prompts short.

Use sensible token limits.

Do not repeatedly send huge context.

### 8. CloudWatch

Avoid unnecessarily high log volume and very short retention.

### 9. Cleanup

Delete the infrastructure when your lab is finished.

---

# 58. Cleanup — Dependency-Aware

Do not randomly delete resources.

Recommended order:

```text
CloudFront
   |
Route 53 records
   |
ALB
   |
ASG
   |
Launch Template
   |
EC2
   |
RDS
   |
NAT Gateway
   |
Elastic IP
   |
S3
   |
CloudWatch resources
   |
CloudTrail resources
   |
Security Groups
   |
Route Tables
   |
Subnets
   |
Internet Gateway
   |
VPC
```

Before deleting:

```text
S3
```

empty the bucket.

Before deleting:

```text
RDS
```

ensure you no longer need the data.

For a learning lab, avoid keeping snapshots unintentionally if your goal is complete cost cleanup.

---

# 59. Resume Description

Use this version:

## Project: APEX Care Hospital — AI-Powered 3-Tier AWS Application

> Designed and deployed a production-style educational 3-tier hospital web application on AWS using Amazon VPC, private/public subnets, Application Load Balancer, EC2 Auto Scaling, Amazon RDS MySQL, Amazon S3, CloudFront, Route 53, ACM, IAM, Amazon Bedrock, CloudWatch and CloudTrail. Implemented secure tier-to-tier communication using Security Groups, private database access, IAM roles and HTTPS. Developed Node.js/Express REST APIs with authentication, appointment workflows and Bedrock-powered informational AI assistant. Demonstrated high availability, health checks, auto scaling, failure testing, monitoring, auditing and cost optimization.

---

# 60. How to Explain the Project in 60 Seconds

> "APEX Care Hospital is a fictional educational hospital application deployed using a three-tier AWS architecture.
>
> The presentation layer uses S3 and CloudFront, with Route 53 providing DNS.
>
> API traffic is routed through an Application Load Balancer to Node.js/Express EC2 instances managed by an Auto Scaling Group across two Availability Zones.
>
> The application servers are in private subnets and communicate with a private Amazon RDS MySQL database through Security Group-based access on port 3306.
>
> The backend communicates with Amazon Bedrock using an EC2 IAM role instead of hard-coded AWS credentials.
>
> CloudWatch handles monitoring and alarms, while CloudTrail provides auditing of AWS API activity.
>
> I also tested instance failure, unhealthy targets, CPU scaling, database connectivity failure and Bedrock permission failure."

---

# 61. Interview Questions — Beginner

### 1. Why did you use a 3-tier architecture?

Because presentation, application and data responsibilities are separated, making security, scaling and maintenance easier.

### 2. Why is RDS private?

The database should not be directly reachable from the Internet.

### 3. Why use an ALB?

To distribute HTTP/HTTPS requests across healthy application instances.

### 4. Why use Auto Scaling?

To maintain application capacity and replace unhealthy instances.

### 5. Why use two AZs?

To reduce dependency on a single Availability Zone.

### 6. Why use S3?

To store static frontend files.

### 7. Why use CloudFront?

To deliver static content through a CDN and provide HTTPS at the edge.

### 8. Why use Route 53?

To provide DNS.

### 9. Why use RDS?

AWS manages much of the database infrastructure, allowing the application team to focus on the application.

### 10. Why use Bedrock?

To integrate foundation-model AI through AWS-managed APIs.

---

# 62. Interview Questions — Intermediate

### 1. Why are EC2 instances private?

To prevent direct Internet access to the application servers.

### 2. How can private EC2 access the Internet?

Through NAT Gateway for outbound connections.

### 3. Why is RDS in two DB subnets?

RDS subnet groups require subnets across AZs for appropriate database deployment options and availability architecture.

### 4. What happens when EC2 fails?

ALB health checks identify an unhealthy target and ASG can replace the instance.

### 5. What is the difference between SG and NACL?

Security Groups are stateful instance/resource-level controls; NACLs operate at subnet level and are stateless.

### 6. Why not put the DB in public subnet?

Because database Internet exposure is unnecessary and increases attack surface.

### 7. Why use IAM role?

It avoids embedding long-lived AWS credentials in the application.

### 8. What is a Target Group?

It is the group of backend targets to which the load balancer sends traffic.

### 9. What is a health check?

A request used by ALB to determine whether a target is healthy.

### 10. Why `/api/health`?

It provides a lightweight deterministic endpoint for infrastructure health checks.

---

# 63. Interview Questions — Advanced

### 1. Why use CloudFront for `/api/*`?

It allows a single public domain while routing static requests to S3 and API requests to ALB.

### 2. Why should API caching be limited?

User-specific or dynamic responses should not be served from stale/shared caches.

### 3. What does OAC solve?

It lets CloudFront access private S3 content without making the bucket public.

### 4. Why is ACM for CloudFront in us-east-1?

CloudFront requires its viewer certificate to be in the US East (N. Virginia) ACM region.

### 5. What causes ALB 502?

Often backend connectivity/protocol/port/application issues.

### 6. What causes ALB 503?

Often no healthy target is available.

### 7. How would you secure Bedrock?

Use an IAM role with only the required Bedrock invocation permissions and restrict the model/resource where supported.

### 8. How would you remove passwords from `.env`?

Use Secrets Manager or Parameter Store and retrieve them at runtime using an IAM role.

### 9. How would you scale the database?

Depending on requirements, use RDS scaling/read replicas/Aurora or other appropriate architecture.

### 10. How would you improve production resilience?

Add backups, Multi-AZ database deployment, stronger secret management, WAF where appropriate, centralized logs, alerting, disaster-recovery planning, infrastructure as code and CI/CD.

---

# 64. Scenario Questions

## Scenario 1

ALB returns 503.

Answer:

```text
Check Target Group
-> target health
-> EC2 running
-> application running
-> port 3000
-> Security Group
-> /api/health
```

## Scenario 2

RDS connection times out.

Check:

```text
RDS status
DB endpoint DNS
DB SG 3306 from APP SG
EC2 subnet
route tables
credentials
```

## Scenario 3

Bedrock returns AccessDenied.

Check:

```text
EC2 IAM role
bedrock:InvokeModel
model access
model/inference profile ID
AWS region
```

## Scenario 4

CloudFront shows old website.

Check:

```text
S3 object updated?
CloudFront origin?
Cache?
Invalidation?
```

## Scenario 5

One EC2 dies.

Expected architecture:

```text
ALB -> removes unhealthy target
ASG -> launches replacement
healthy EC2 -> continues serving
```

---

# 65. Final Demonstration Flow

When presenting the completed project, use this sequence:

```text
1. Show architecture diagram
2. Open APEX Care Hospital website
3. Show CloudFront
4. Show S3
5. Open /api/health
6. Show ALB
7. Show Target Group
8. Show two EC2 instances
9. Show Auto Scaling Group
10. Show private subnets
11. Show RDS
12. Show database records
13. Register/login
14. Book appointment
15. Ask AI:
    "What departments are available?"
16. Show Bedrock
17. Show CloudWatch
18. Show CloudTrail
19. Stop one EC2
20. Show ALB/ASG recovery
21. Explain security
22. Explain cost optimization
23. Explain cleanup
```

---

# 66. Final Project Checklist

```text
[ ] AWS account prepared
[ ] Billing alert/budget configured
[ ] VPC created
[ ] Public subnets created
[ ] Private application subnets created
[ ] Private database subnets created
[ ] Internet Gateway attached
[ ] Public route table configured
[ ] NAT Gateway created
[ ] Private app route table configured
[ ] DB route table configured
[ ] ALB security group created
[ ] APP security group created
[ ] DB security group created
[ ] RDS subnet group created
[ ] RDS created
[ ] Database created
[ ] Tables created
[ ] Sample data inserted
[ ] Backend installed
[ ] Backend local test successful
[ ] EC2 IAM role created
[ ] EC2 launched
[ ] Node.js installed
[ ] Backend deployed
[ ] PM2 configured
[ ] Target Group created
[ ] ALB created
[ ] Health check successful
[ ] Launch Template created
[ ] ASG created
[ ] Two EC2 instances healthy
[ ] S3 created
[ ] Frontend uploaded
[ ] CloudFront created
[ ] /api/* routed to ALB
[ ] CloudFront frontend working
[ ] ACM certificate issued
[ ] Route 53 configured
[ ] HTTPS working
[ ] Bedrock model access configured
[ ] Bedrock IAM configured
[ ] AI API working
[ ] CloudWatch configured
[ ] CloudTrail configured
[ ] End-to-end tests passed
[ ] EC2 failure test passed
[ ] Health-check failure test passed
[ ] CPU test completed
[ ] DB failure test completed
[ ] Bedrock permission failure test completed
[ ] Security review completed
[ ] Cost review completed
[ ] Cleanup completed
```

---

# 67. What You Should NOT Claim in an Interview

Do not say:

> "This is a real hospital production system."

Say:

> "This is a production-style educational AWS project using fictional hospital data."

Do not say:

> "The AI diagnoses patients."

Say:

> "The Bedrock assistant is intentionally restricted to general hospital information and non-diagnostic educational responses."

Do not say:

> "I used API keys for Bedrock."

Say:

> "The EC2 application uses an IAM role to invoke Bedrock without embedding AWS access keys."

---

# 68. Architecture Knowledge You Must Remember

The entire project can be reduced to six statements:

```text
1. S3 stores the frontend.
2. CloudFront delivers the frontend.
3. ALB distributes API traffic.
4. EC2/ASG runs the Node.js backend.
5. RDS stores application data privately.
6. Bedrock provides informational AI through the backend.
```

And the security model:

```text
Internet
   |
   v
ALB
   |
   v
Private EC2
   |
   v
Private RDS
```

And AI:

```text
Private EC2
   |
   v
IAM Role
   |
   v
Bedrock
```

---

# 69. Current AWS Documentation Notes

This guide intentionally avoids hard-coding assumptions that can change in AWS Console.

AWS currently documents the Bedrock Converse API as a unified interface for models supporting messages, and the operation requires `bedrock:InvokeModel`.

Amazon Linux 2023 currently exposes supported Node.js packages including 20, 22 and 24.

AWS documents that CloudFront viewer certificates using ACM must be in `us-east-1`.

These details should be rechecked against the AWS console during the lab because AWS service/model availability and console UI can change.

---

# 70. Final Success Criteria

The project is successful when this single request works:

```text
Browser
   |
   | HTTPS
   v
YOUR_DOMAIN_NAME
   |
   v
Route 53
   |
   v
CloudFront
   |
   +--------------------+
   |                    |
   v                    v
  S3                   ALB
                        |
                        v
                   Target Group
                    /         \
                   v           v
                 EC2-A       EC2-B
                   \           /
                    \         /
                   Node.js API
                   /         \
                  v           v
                RDS        Bedrock
```

and the following works:

```text
https://YOUR_DOMAIN_NAME
```

```text
https://YOUR_DOMAIN_NAME/api/health
```

```text
https://YOUR_DOMAIN_NAME/api/doctors
```

```text
https://YOUR_DOMAIN_NAME/api/departments
```

```text
POST /api/register
POST /api/login
POST /api/appointments
POST /api/ai/chat
```

with:

```text
RDS = private
EC2 = private
ALB = public entry point
S3 = private behind CloudFront OAC
HTTPS = enabled
ASG = 2 to 4
Bedrock = IAM role
CloudWatch = monitoring
CloudTrail = auditing
```

**This is the target state. Do not move to the next resource if the current dependency is not validated.**
