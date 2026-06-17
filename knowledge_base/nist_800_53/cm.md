# NIST SP 800-53 Rev 5 — Configuration Management (CM)

_Source: NIST SP 800-53 Rev 5 control catalog (public domain). Each heading is a real control ID for citation._

## CM-1 Policy and Procedures
Develop, document, and disseminate to [assignment]: [assignment] configuration management policy that: Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and Procedures to facilitate the implementation of the configuration management policy and the associated configuration management controls; Designate an [assignment] to manage the development, documentation, and dissemination of the configuration management policy and procedures; and Review and update the current configuration management: Policy [assignment] and following [assignment] ; and Procedures [assignment] and following [assignment].

## CM-2 Baseline Configuration
Develop, document, and maintain under configuration control, a current baseline configuration of the system; and Review and update the baseline configuration of the system: [assignment]; When required due to [assignment] ; and When system components are installed or upgraded.

## CM-2(2) Automation Support for Accuracy and Currency
Maintain the currency, completeness, accuracy, and availability of the baseline configuration of the system using [assignment].

## CM-2(3) Retention of Previous Configurations
Retain [assignment] of previous versions of baseline configurations of the system to support rollback.

## CM-2(6) Development and Test Environments
Maintain a baseline configuration for system development and test environments that is managed separately from the operational baseline configuration.

## CM-2(7) Configure Systems and Components for High-risk Areas
Issue [assignment] with [assignment] to individuals traveling to locations that the organization deems to be of significant risk; and Apply the following controls to the systems or components when the individuals return from travel: [assignment].

## CM-3 Configuration Change Control
Determine and document the types of changes to the system that are configuration-controlled; Review proposed configuration-controlled changes to the system and approve or disapprove such changes with explicit consideration for security and privacy impact analyses; Document configuration change decisions associated with the system; Implement approved configuration-controlled changes to the system; Retain records of configuration-controlled changes to the system for [assignment]; Monitor and review activities associated with configuration-controlled changes to the system; and Coordinate and provide oversight for configuration change control activities through [assignment] that convenes [assignment].

## CM-3(1) Automated Documentation, Notification, and Prohibition of Changes
Use [assignment] to: Document proposed changes to the system; Notify [assignment] of proposed changes to the system and request change approval; Highlight proposed changes to the system that have not been approved or disapproved within [assignment]; Prohibit changes to the system until designated approvals are received; Document all changes to the system; and Notify [assignment] when approved changes to the system are completed.

## CM-3(2) Testing, Validation, and Documentation of Changes
Test, validate, and document changes to the system before finalizing the implementation of the changes.

## CM-3(3) Automated Change Implementation
Implement changes to the current system baseline and deploy the updated baseline across the installed base using [assignment].

## CM-3(4) Security and Privacy Representatives
Require [assignment] to be members of the [assignment].

## CM-3(5) Automated Security Response
Implement the following security responses automatically if baseline configurations are changed in an unauthorized manner: [assignment].

## CM-3(6) Cryptography Management
Ensure that cryptographic mechanisms used to provide the following controls are under configuration management: [assignment].

## CM-3(7) Review System Changes
Review changes to the system [assignment] or when [assignment] to determine whether unauthorized changes have occurred.

## CM-3(8) Prevent or Restrict Configuration Changes
Prevent or restrict changes to the configuration of the system under the following circumstances: [assignment].

## CM-4 Impact Analyses
Analyze changes to the system to determine potential security and privacy impacts prior to change implementation.

## CM-4(1) Separate Test Environments
Analyze changes to the system in a separate test environment before implementation in an operational environment, looking for security and privacy impacts due to flaws, weaknesses, incompatibility, or intentional malice.

## CM-4(2) Verification of Controls
After system changes, verify that the impacted controls are implemented correctly, operating as intended, and producing the desired outcome with regard to meeting the security and privacy requirements for the system.

## CM-5 Access Restrictions for Change
Define, document, approve, and enforce physical and logical access restrictions associated with changes to the system.

## CM-5(1) Automated Access Enforcement and Audit Records
Enforce access restrictions using [assignment] ; and Automatically generate audit records of the enforcement actions.

## CM-5(4) Dual Authorization
Enforce dual authorization for implementing changes to [assignment].

## CM-5(5) Privilege Limitation for Production and Operation
Limit privileges to change system components and system-related information within a production or operational environment; and Review and reevaluate privileges [assignment].

## CM-5(6) Limit Library Privileges
Limit privileges to change software resident within software libraries.

## CM-6 Configuration Settings
Establish and document configuration settings for components employed within the system that reflect the most restrictive mode consistent with operational requirements using [assignment]; Implement the configuration settings; Identify, document, and approve any deviations from established configuration settings for [assignment] based on [assignment] ; and Monitor and control changes to the configuration settings in accordance with organizational policies and procedures.

## CM-6(1) Automated Management, Application, and Verification
Manage, apply, and verify configuration settings for [assignment] using [assignment].

## CM-6(2) Respond to Unauthorized Changes
Take the following actions in response to unauthorized changes to [assignment]: [assignment].

## CM-7 Least Functionality
Configure the system to provide only [assignment] ; and Prohibit or restrict the use of the following functions, ports, protocols, software, and/or services: [assignment].

## CM-7(1) Periodic Review
Review the system [assignment] to identify unnecessary and/or nonsecure functions, ports, protocols, software, and services; and Disable or remove [assignment].

## CM-7(2) Prevent Program Execution
Prevent program execution in accordance with [assignment].

## CM-7(3) Registration Compliance
Ensure compliance with [assignment].

## CM-7(4) Unauthorized Software — Deny-by-exception
Identify [assignment]; Employ an allow-all, deny-by-exception policy to prohibit the execution of unauthorized software programs on the system; and Review and update the list of unauthorized software programs [assignment].

## CM-7(5) Authorized Software — Allow-by-exception
Identify [assignment]; Employ a deny-all, permit-by-exception policy to allow the execution of authorized software programs on the system; and Review and update the list of authorized software programs [assignment].

## CM-7(6) Confined Environments with Limited Privileges
Require that the following user-installed software execute in a confined physical or virtual machine environment with limited privileges: [assignment].

## CM-7(7) Code Execution in Protected Environments
Allow execution of binary or machine-executable code only in confined physical or virtual machine environments and with the explicit approval of [assignment] when such code is: Obtained from sources with limited or no warranty; and/or Without the provision of source code.

## CM-7(8) Binary or Machine Executable Code
Prohibit the use of binary or machine-executable code from sources with limited or no warranty or without the provision of source code; and Allow exceptions only for compelling mission or operational requirements and with the approval of the authorizing official.

## CM-7(9) Prohibiting The Use of Unauthorized Hardware
Identify [assignment]; Prohibit the use or connection of unauthorized hardware components; Review and update the list of authorized hardware components [assignment].

## CM-8 System Component Inventory
Develop and document an inventory of system components that: Accurately reflects the system; Includes all components within the system; Does not include duplicate accounting of components or components assigned to any other system; Is at the level of granularity deemed necessary for tracking and reporting; and Includes the following information to achieve system component accountability: [assignment] ; and Review and update the system component inventory [assignment].

## CM-8(1) Updates During Installation and Removal
Update the inventory of system components as part of component installations, removals, and system updates.

## CM-8(2) Automated Maintenance
Maintain the currency, completeness, accuracy, and availability of the inventory of system components using [assignment].

## CM-8(3) Automated Unauthorized Component Detection
Detect the presence of unauthorized hardware, software, and firmware components within the system using [assignment] [assignment] ; and Take the following actions when unauthorized components are detected: [assignment].

## CM-8(4) Accountability Information
Include in the system component inventory information, a means for identifying by [assignment] , individuals responsible and accountable for administering those components.

## CM-8(6) Assessed Configurations and Approved Deviations
Include assessed component configurations and any approved deviations to current deployed configurations in the system component inventory.

## CM-8(7) Centralized Repository
Provide a centralized repository for the inventory of system components.

## CM-8(8) Automated Location Tracking
Support the tracking of system components by geographic location using [assignment].

## CM-8(9) Assignment of Components to Systems
Assign system components to a system; and Receive an acknowledgement from [assignment] of this assignment.

## CM-9 Configuration Management Plan
Develop, document, and implement a configuration management plan for the system that: Addresses roles, responsibilities, and configuration management processes and procedures; Establishes a process for identifying configuration items throughout the system development life cycle and for managing the configuration of the configuration items; Defines the configuration items for the system and places the configuration items under configuration management; Is reviewed and approved by [assignment] ; and Protects the configuration management plan from unauthorized disclosure and modification.

## CM-9(1) Assignment of Responsibility
Assign responsibility for developing the configuration management process to organizational personnel that are not directly involved in system development.

## CM-10 Software Usage Restrictions
Use software and associated documentation in accordance with contract agreements and copyright laws; Track the use of software and associated documentation protected by quantity licenses to control copying and distribution; and Control and document the use of peer-to-peer file sharing technology to ensure that this capability is not used for the unauthorized distribution, display, performance, or reproduction of copyrighted work.

## CM-10(1) Open-source Software
Establish the following restrictions on the use of open-source software: [assignment].

## CM-11 User-installed Software
Establish [assignment] governing the installation of software by users; Enforce software installation policies through the following methods: [assignment] ; and Monitor policy compliance [assignment].

## CM-11(2) Software Installation with Privileged Status
Allow user installation of software only with explicit privileged status.

## CM-11(3) Automated Enforcement and Monitoring
Enforce and monitor compliance with software installation policies using [assignment].

## CM-12 Information Location
Identify and document the location of [assignment] and the specific system components on which the information is processed and stored; Identify and document the users who have access to the system and system components where the information is processed and stored; and Document changes to the location (i.e., system or system components) where the information is processed and stored.

## CM-12(1) Automated Tools to Support Information Location
Use automated tools to identify [assignment] on [assignment] to ensure controls are in place to protect organizational information and individual privacy.

## CM-13 Data Action Mapping
Develop and document a map of system data actions.

## CM-14 Signed Components
Prevent the installation of [assignment] without verification that the component has been digitally signed using a certificate that is recognized and approved by the organization.
