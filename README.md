APEX Care Hospital — MediAI 

AI-Enabled Healthcare Application | AWS Cloud & DevOps Project

APEX Care Hospital — MediAI is a healthcare web application project integrating hospital-related features with AI-assisted functionality. The project explores secure AWS infrastructure, backend deployment, database connectivity, and cloud monitoring.

Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Cloud: Amazon Web Services (AWS)
- AI: Amazon Bedrock
- Version Control: Git and GitHub

AWS Architecture

The target architecture includes:

- Amazon VPC: Public and private subnet design.
- Amazon EC2: Backend application hosting.
- Application Load Balancer: Routes requests to backend instances.
- EC2 Auto Scaling: Scales application capacity based on configured policies.
- Amazon RDS: Managed relational database in private subnets.
- Amazon S3: Frontend asset storage.
- Amazon CloudFront: Secure content delivery.
- AWS IAM: Role-based permissions and least-privilege access.
- AWS Systems Manager Session Manager: Secure access to private EC2 instances without public SSH.
- Amazon Bedrock: AI-powered backend integration.
- Amazon CloudWatch: Monitoring, logs, alarms, and scaling metrics.
- Amazon Route 53: Optional custom domain and DNS management.

Architecture Flow

Users
  |
  v
CloudFront ---> Private S3 Bucket
  |
  v
Application Frontend
  |
  v
Application Load Balancer
  |
  v
EC2 Auto Scaling Group
  |
  +----> Amazon RDS
  |
  +----> Amazon Bedrock

CloudWatch ---> Alarms ---> Auto Scaling
IAM Roles ---> AWS Permissions
Session Manager ---> Secure EC2 Access


Project Structure

Apex-Care_MediAI/
├── backend-deploy-staging/
├── code/
│   ├── backend/
│   ├── database/
│   ├── deployment/
│   └── frontend/
├── media/
├── APEX_Care_Hospital_End_to_End_Guide.md
├── MediAI_Dependencies.txt
└── README.md

Key Learning Areas

- AWS networking and VPC security
- EC2 deployment and load balancing
- Auto Scaling and CloudWatch monitoring
- RDS connectivity and security groups
- S3 and CloudFront integration
- IAM roles and Session Manager
- Amazon Bedrock integration
- Git and GitHub project management

Security

- Keep database resources in private subnets.
- Restrict database access to the backend security group.
- Use IAM roles instead of hardcoded AWS credentials.
- Keep secrets and `.env` files out of GitHub.
- Use HTTPS and appropriate access controls.


GitHub: [@itzkajal](https://github.com/itzkajal)

Repository: [APEX Care Hospital — MediAI](https://github.com/itzkajal/Apex-Care_MediAI)