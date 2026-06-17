# NIST SP 800-53 Rev 5 — Access Control (AC)

_Source: NIST SP 800-53 Rev 5 control catalog (public domain). Each heading is a real control ID for citation._

## AC-1 Policy and Procedures
Develop, document, and disseminate to [assignment]: [assignment] access control policy that: Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and Procedures to facilitate the implementation of the access control policy and the associated access controls; Designate an [assignment] to manage the development, documentation, and dissemination of the access control policy and procedures; and Review and update the current access control: Policy [assignment] and following [assignment] ; and Procedures [assignment] and following [assignment].

## AC-2 Account Management
Define and document the types of accounts allowed and specifically prohibited for use within the system; Assign account managers; Require [assignment] for group and role membership; Specify: Authorized users of the system; Group and role membership; and Access authorizations (i.e., privileges) and [assignment] for each account; Require approvals by [assignment] for requests to create accounts; Create, enable, modify, disable, and remove accounts in accordance with [assignment]; Monitor the use of accounts; Notify account managers and [assignment] within: [assignment] when accounts are no longer required; [assignment] when users are terminated or transferred; and [assignment] when system usage or need-to-know changes for an individual; Authorize access to the system based on: A valid access authorization; Intended system usage; and [assignment]; Review accounts for compliance with account management requirements [assignment]; Establish and implement a process for changing shared or group account authenticators (if deployed) when individuals are removed from the group; and Align account management processes with personnel termination and transfer processes.

## AC-2(1) Automated System Account Management
Support the management of system accounts using [assignment].

## AC-2(2) Automated Temporary and Emergency Account Management
Automatically [assignment] temporary and emergency accounts after [assignment].

## AC-2(3) Disable Accounts
Disable accounts within [assignment] when the accounts: Have expired; Are no longer associated with a user or individual; Are in violation of organizational policy; or Have been inactive for [assignment].

## AC-2(4) Automated Audit Actions
Automatically audit account creation, modification, enabling, disabling, and removal actions.

## AC-2(5) Inactivity Logout
Require that users log out when [assignment].

## AC-2(6) Dynamic Privilege Management
Implement [assignment].

## AC-2(7) Privileged User Accounts
Establish and administer privileged user accounts in accordance with [assignment]; Monitor privileged role or attribute assignments; Monitor changes to roles or attributes; and Revoke access when privileged role or attribute assignments are no longer appropriate.

## AC-2(8) Dynamic Account Management
Create, activate, manage, and deactivate [assignment] dynamically.

## AC-2(9) Restrictions on Use of Shared and Group Accounts
Only permit the use of shared and group accounts that meet [assignment].

## AC-2(11) Usage Conditions
Enforce [assignment] for [assignment].

## AC-2(12) Account Monitoring for Atypical Usage
Monitor system accounts for [assignment] ; and Report atypical usage of system accounts to [assignment].

## AC-2(13) Disable Accounts for High-risk Individuals
Disable accounts of individuals within [assignment] of discovery of [assignment].

## AC-3 Access Enforcement
Enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies.

## AC-3(2) Dual Authorization
Enforce dual authorization for [assignment].

## AC-3(3) Mandatory Access Control
Enforce [assignment] over the set of covered subjects and objects specified in the policy, and where the policy: Is uniformly enforced across the covered subjects and objects within the system; Specifies that a subject that has been granted access to information is constrained from doing any of the following; Passing the information to unauthorized subjects or objects; Granting its privileges to other subjects; Changing one or more security attributes (specified by the policy) on subjects, objects, the system, or system components; Choosing the security attributes and attribute values (specified by the policy) to be associated with newly created or modified objects; and Changing the rules governing access control; and Specifies that [assignment] may explicitly be granted [assignment] such that they are not limited by any defined subset (or all) of the above constraints.

## AC-3(4) Discretionary Access Control
Enforce [assignment] over the set of covered subjects and objects specified in the policy, and where the policy specifies that a subject that has been granted access to information can do one or more of the following: Pass the information to any other subjects or objects; Grant its privileges to other subjects; Change security attributes on subjects, objects, the system, or the system’s components; Choose the security attributes to be associated with newly created or revised objects; or Change the rules governing access control.

## AC-3(5) Security-relevant Information
Prevent access to [assignment] except during secure, non-operable system states.

## AC-3(7) Role-based Access Control
Enforce a role-based access control policy over defined subjects and objects and control access based upon [assignment].

## AC-3(8) Revocation of Access Authorizations
Enforce the revocation of access authorizations resulting from changes to the security attributes of subjects and objects based on [assignment].

## AC-3(9) Controlled Release
Release information outside of the system only if: The receiving [assignment] provides [assignment] ; and [assignment] are used to validate the appropriateness of the information designated for release.

## AC-3(10) Audited Override of Access Control Mechanisms
Employ an audited override of automated access control mechanisms under [assignment] by [assignment].

## AC-3(11) Restrict Access to Specific Information Types
Restrict access to data repositories containing [assignment].

## AC-3(12) Assert and Enforce Application Access
Require applications to assert, as part of the installation process, the access needed to the following system applications and functions: [assignment]; Provide an enforcement mechanism to prevent unauthorized access; and Approve access changes after initial installation of the application.

## AC-3(13) Attribute-based Access Control
Enforce attribute-based access control policy over defined subjects and objects and control access based upon [assignment].

## AC-3(14) Individual Access
Provide [assignment] to enable individuals to have access to the following elements of their personally identifiable information: [assignment].

## AC-3(15) Discretionary and Mandatory Access Control
Enforce [assignment] over the set of covered subjects and objects specified in the policy; and Enforce [assignment] over the set of covered subjects and objects specified in the policy.

## AC-4 Information Flow Enforcement
Enforce approved authorizations for controlling the flow of information within the system and between connected systems based on [assignment].

## AC-4(1) Object Security and Privacy Attributes
Use [assignment] associated with [assignment] to enforce [assignment] as a basis for flow control decisions.

## AC-4(2) Processing Domains
Use protected processing domains to enforce [assignment] as a basis for flow control decisions.

## AC-4(3) Dynamic Information Flow Control
Enforce [assignment].

## AC-4(4) Flow Control of Encrypted Information
Prevent encrypted information from bypassing [assignment] by [assignment].

## AC-4(5) Embedded Data Types
Enforce [assignment] on embedding data types within other data types.

## AC-4(6) Metadata
Enforce information flow control based on [assignment].

## AC-4(7) One-way Flow Mechanisms
Enforce one-way information flows through hardware-based flow control mechanisms.

## AC-4(8) Security and Privacy Policy Filters
Enforce information flow control using [assignment] as a basis for flow control decisions for [assignment] ; and [assignment] data after a filter processing failure in accordance with [assignment].

## AC-4(9) Human Reviews
Enforce the use of human reviews for [assignment] under the following conditions: [assignment].

## AC-4(10) Enable and Disable Security or Privacy Policy Filters
Provide the capability for privileged administrators to enable and disable [assignment] under the following conditions: [assignment].

## AC-4(11) Configuration of Security or Privacy Policy Filters
Provide the capability for privileged administrators to configure [assignment] to support different security or privacy policies.

## AC-4(12) Data Type Identifiers
When transferring information between different security domains, use [assignment] to validate data essential for information flow decisions.

## AC-4(13) Decomposition into Policy-relevant Subcomponents
When transferring information between different security domains, decompose information into [assignment] for submission to policy enforcement mechanisms.

## AC-4(14) Security or Privacy Policy Filter Constraints
When transferring information between different security domains, implement [assignment] requiring fully enumerated formats that restrict data structure and content.

## AC-4(15) Detection of Unsanctioned Information
When transferring information between different security domains, examine the information for the presence of [assignment] and prohibit the transfer of such information in accordance with the [assignment].

## AC-4(17) Domain Authentication
Uniquely identify and authenticate source and destination points by [assignment] for information transfer.

## AC-4(19) Validation of Metadata
When transferring information between different security domains, implement [assignment] on metadata.

## AC-4(20) Approved Solutions
Employ [assignment] to control the flow of [assignment] across security domains.

## AC-4(21) Physical or Logical Separation of Information Flows
Separate information flows logically or physically using [assignment] to accomplish [assignment].

## AC-4(22) Access Only
Provide access from a single device to computing platforms, applications, or data residing in multiple different security domains, while preventing information flow between the different security domains.

## AC-4(23) Modify Non-releasable Information
When transferring information between different security domains, modify non-releasable information by implementing [assignment].

## AC-4(24) Internal Normalized Format
When transferring information between different security domains, parse incoming data into an internal normalized format and regenerate the data to be consistent with its intended specification.

## AC-4(25) Data Sanitization
When transferring information between different security domains, sanitize data to minimize [assignment] in accordance with [assignment].

## AC-4(26) Audit Filtering Actions
When transferring information between different security domains, record and audit content filtering actions and results for the information being filtered.

## AC-4(27) Redundant/Independent Filtering Mechanisms
When transferring information between different security domains, implement content filtering solutions that provide redundant and independent filtering mechanisms for each data type.

## AC-4(28) Linear Filter Pipelines
When transferring information between different security domains, implement a linear content filter pipeline that is enforced with discretionary and mandatory access controls.

## AC-4(29) Filter Orchestration Engines
When transferring information between different security domains, employ content filter orchestration engines to ensure that: Content filtering mechanisms successfully complete execution without errors; and Content filtering actions occur in the correct order and comply with [assignment].

## AC-4(30) Filter Mechanisms Using Multiple Processes
When transferring information between different security domains, implement content filtering mechanisms using multiple processes.

## AC-4(31) Failed Content Transfer Prevention
When transferring information between different security domains, prevent the transfer of failed content to the receiving domain.

## AC-4(32) Process Requirements for Information Transfer
When transferring information between different security domains, the process that transfers information between filter pipelines: Does not filter message content; Validates filtering metadata; Ensures the content associated with the filtering metadata has successfully completed filtering; and Transfers the content to the destination filter pipeline.

## AC-5 Separation of Duties
Identify and document [assignment] ; and Define system access authorizations to support separation of duties.

## AC-6 Least Privilege
Employ the principle of least privilege, allowing only authorized accesses for users (or processes acting on behalf of users) that are necessary to accomplish assigned organizational tasks.

## AC-6(1) Authorize Access to Security Functions
Authorize access for [assignment] to: [assignment] ; and [assignment].

## AC-6(2) Non-privileged Access for Nonsecurity Functions
Require that users of system accounts (or roles) with access to [assignment] use non-privileged accounts or roles, when accessing nonsecurity functions.

## AC-6(3) Network Access to Privileged Commands
Authorize network access to [assignment] only for [assignment] and document the rationale for such access in the security plan for the system.

## AC-6(4) Separate Processing Domains
Provide separate processing domains to enable finer-grained allocation of user privileges.

## AC-6(5) Privileged Accounts
Restrict privileged accounts on the system to [assignment].

## AC-6(6) Privileged Access by Non-organizational Users
Prohibit privileged access to the system by non-organizational users.

## AC-6(7) Review of User Privileges
Review [assignment] the privileges assigned to [assignment] to validate the need for such privileges; and Reassign or remove privileges, if necessary, to correctly reflect organizational mission and business needs.

## AC-6(8) Privilege Levels for Code Execution
Prevent the following software from executing at higher privilege levels than users executing the software: [assignment].

## AC-6(9) Log Use of Privileged Functions
Log the execution of privileged functions.

## AC-6(10) Prohibit Non-privileged Users from Executing Privileged Functions
Prevent non-privileged users from executing privileged functions.

## AC-7 Unsuccessful Logon Attempts
Enforce a limit of [assignment] consecutive invalid logon attempts by a user during a [assignment] ; and Automatically [assignment] when the maximum number of unsuccessful attempts is exceeded.

## AC-7(2) Purge or Wipe Mobile Device
Purge or wipe information from [assignment] based on [assignment] after [assignment] consecutive, unsuccessful device logon attempts.

## AC-7(3) Biometric Attempt Limiting
Limit the number of unsuccessful biometric logon attempts to [assignment].

## AC-7(4) Use of Alternate Authentication Factor
Allow the use of [assignment] that are different from the primary authentication factors after the number of organization-defined consecutive invalid logon attempts have been exceeded; and Enforce a limit of [assignment] consecutive invalid logon attempts through use of the alternative factors by a user during a [assignment].

## AC-8 System Use Notification
Display [assignment] to users before granting access to the system that provides privacy and security notices consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines and state that: Users are accessing a U.S. Government system; System usage may be monitored, recorded, and subject to audit; Unauthorized use of the system is prohibited and subject to criminal and civil penalties; and Use of the system indicates consent to monitoring and recording; Retain the notification message or banner on the screen until users acknowledge the usage conditions and take explicit actions to log on to or further access the system; and For publicly accessible systems: Display system use information [assignment] , before granting further access to the publicly accessible system; Display references, if any, to monitoring, recording, or auditing that are consistent with privacy accommodations for such systems that generally prohibit those activities; and Include a description of the authorized uses of the system.

## AC-9 Previous Logon Notification
Notify the user, upon successful logon to the system, of the date and time of the last logon.

## AC-9(1) Unsuccessful Logons
Notify the user, upon successful logon, of the number of unsuccessful logon attempts since the last successful logon.

## AC-9(2) Successful and Unsuccessful Logons
Notify the user, upon successful logon, of the number of [assignment] during [assignment].

## AC-9(3) Notification of Account Changes
Notify the user, upon successful logon, of changes to [assignment] during [assignment].

## AC-9(4) Additional Logon Information
Notify the user, upon successful logon, of the following additional information: [assignment].

## AC-10 Concurrent Session Control
Limit the number of concurrent sessions for each [assignment] to [assignment].

## AC-11 Device Lock
Prevent further access to the system by [assignment] ; and Retain the device lock until the user reestablishes access using established identification and authentication procedures.

## AC-11(1) Pattern-hiding Displays
Conceal, via the device lock, information previously visible on the display with a publicly viewable image.

## AC-12 Session Termination
Automatically terminate a user session after [assignment].

## AC-12(1) User-initiated Logouts
Provide a logout capability for user-initiated communications sessions whenever authentication is used to gain access to [assignment].

## AC-12(2) Termination Message
Display an explicit logout message to users indicating the termination of authenticated communications sessions.

## AC-12(3) Timeout Warning Message
Display an explicit message to users indicating that the session will end in [assignment].

## AC-14 Permitted Actions Without Identification or Authentication
Identify [assignment] that can be performed on the system without identification or authentication consistent with organizational mission and business functions; and Document and provide supporting rationale in the security plan for the system, user actions not requiring identification or authentication.

## AC-16 Security and Privacy Attributes
Provide the means to associate [assignment] with [assignment] for information in storage, in process, and/or in transmission; Ensure that the attribute associations are made and retained with the information; Establish the following permitted security and privacy attributes from the attributes defined in [AC-16a](#ac-16_smt.a) for [assignment]: [assignment]; Determine the following permitted attribute values or ranges for each of the established attributes: [assignment]; Audit changes to attributes; and Review [assignment] for applicability [assignment].

## AC-16(1) Dynamic Attribute Association
Dynamically associate security and privacy attributes with [assignment] in accordance with the following security and privacy policies as information is created and combined: [assignment].

## AC-16(2) Attribute Value Changes by Authorized Individuals
Provide authorized individuals (or processes acting on behalf of individuals) the capability to define or change the value of associated security and privacy attributes.

## AC-16(3) Maintenance of Attribute Associations by System
Maintain the association and integrity of [assignment] to [assignment].

## AC-16(4) Association of Attributes by Authorized Individuals
Provide the capability to associate [assignment] with [assignment] by authorized individuals (or processes acting on behalf of individuals).

## AC-16(5) Attribute Displays on Objects to Be Output
Display security and privacy attributes in human-readable form on each object that the system transmits to output devices to identify [assignment] using [assignment].

## AC-16(6) Maintenance of Attribute Association
Require personnel to associate and maintain the association of [assignment] with [assignment] in accordance with [assignment].

## AC-16(7) Consistent Attribute Interpretation
Provide a consistent interpretation of security and privacy attributes transmitted between distributed system components.

## AC-16(8) Association Techniques and Technologies
Implement [assignment] in associating security and privacy attributes to information.

## AC-16(9) Attribute Reassignment — Regrading Mechanisms
Change security and privacy attributes associated with information only via regrading mechanisms validated using [assignment].

## AC-16(10) Attribute Configuration by Authorized Individuals
Provide authorized individuals the capability to define or change the type and value of security and privacy attributes available for association with subjects and objects.

## AC-17 Remote Access
Establish and document usage restrictions, configuration/connection requirements, and implementation guidance for each type of remote access allowed; and Authorize each type of remote access to the system prior to allowing such connections.

## AC-17(1) Monitoring and Control
Employ automated mechanisms to monitor and control remote access methods.

## AC-17(2) Protection of Confidentiality and Integrity Using Encryption
Implement cryptographic mechanisms to protect the confidentiality and integrity of remote access sessions.

## AC-17(3) Managed Access Control Points
Route remote accesses through authorized and managed network access control points.

## AC-17(4) Privileged Commands and Access
Authorize the execution of privileged commands and access to security-relevant information via remote access only in a format that provides assessable evidence and for the following needs: [assignment] ; and Document the rationale for remote access in the security plan for the system.

## AC-17(6) Protection of Mechanism Information
Protect information about remote access mechanisms from unauthorized use and disclosure.

## AC-17(9) Disconnect or Disable Access
Provide the capability to disconnect or disable remote access to the system within [assignment].

## AC-17(10) Authenticate Remote Commands
Implement [assignment] to authenticate [assignment].

## AC-18 Wireless Access
Establish configuration requirements, connection requirements, and implementation guidance for each type of wireless access; and Authorize each type of wireless access to the system prior to allowing such connections.

## AC-18(1) Authentication and Encryption
Protect wireless access to the system using authentication of [assignment] and encryption.

## AC-18(3) Disable Wireless Networking
Disable, when not intended for use, wireless networking capabilities embedded within system components prior to issuance and deployment.

## AC-18(4) Restrict Configurations by Users
Identify and explicitly authorize users allowed to independently configure wireless networking capabilities.

## AC-18(5) Antennas and Transmission Power Levels
Select radio antennas and calibrate transmission power levels to reduce the probability that signals from wireless access points can be received outside of organization-controlled boundaries.

## AC-19 Access Control for Mobile Devices
Establish configuration requirements, connection requirements, and implementation guidance for organization-controlled mobile devices, to include when such devices are outside of controlled areas; and Authorize the connection of mobile devices to organizational systems.

## AC-19(4) Restrictions for Classified Information
Prohibit the use of unclassified mobile devices in facilities containing systems processing, storing, or transmitting classified information unless specifically permitted by the authorizing official; and Enforce the following restrictions on individuals permitted by the authorizing official to use unclassified mobile devices in facilities containing systems processing, storing, or transmitting classified information: Connection of unclassified mobile devices to classified systems is prohibited; Connection of unclassified mobile devices to unclassified systems requires approval from the authorizing official; Use of internal or external modems or wireless interfaces within the unclassified mobile devices is prohibited; and Unclassified mobile devices and the information stored on those devices are subject to random reviews and inspections by [assignment] , and if classified information is found, the incident handling policy is followed. Restrict the connection of classified mobile devices to classified systems in accordance with [assignment].

## AC-19(5) Full Device or Container-based Encryption
Employ [assignment] to protect the confidentiality and integrity of information on [assignment].

## AC-20 Use of External Systems
[assignment] , consistent with the trust relationships established with other organizations owning, operating, and/or maintaining external systems, allowing authorized individuals to: Access the system from external systems; and Process, store, or transmit organization-controlled information using external systems; or Prohibit the use of [assignment].

## AC-20(1) Limits on Authorized Use
Permit authorized individuals to use an external system to access the system or to process, store, or transmit organization-controlled information only after: Verification of the implementation of controls on the external system as specified in the organization’s security and privacy policies and security and privacy plans; or Retention of approved system connection or processing agreements with the organizational entity hosting the external system.

## AC-20(2) Portable Storage Devices — Restricted Use
Restrict the use of organization-controlled portable storage devices by authorized individuals on external systems using [assignment].

## AC-20(3) Non-organizationally Owned Systems — Restricted Use
Restrict the use of non-organizationally owned systems or system components to process, store, or transmit organizational information using [assignment].

## AC-20(4) Network Accessible Storage Devices — Prohibited Use
Prohibit the use of [assignment] in external systems.

## AC-20(5) Portable Storage Devices — Prohibited Use
Prohibit the use of organization-controlled portable storage devices by authorized individuals on external systems.

## AC-21 Information Sharing
Enable authorized users to determine whether access authorizations assigned to a sharing partner match the information’s access and use restrictions for [assignment] ; and Employ [assignment] to assist users in making information sharing and collaboration decisions.

## AC-21(1) Automated Decision Support
Employ [assignment] to enforce information-sharing decisions by authorized users based on access authorizations of sharing partners and access restrictions on information to be shared.

## AC-21(2) Information Search and Retrieval
Implement information search and retrieval services that enforce [assignment].

## AC-22 Publicly Accessible Content
Designate individuals authorized to make information publicly accessible; Train authorized individuals to ensure that publicly accessible information does not contain nonpublic information; Review the proposed content of information prior to posting onto the publicly accessible system to ensure that nonpublic information is not included; and Review the content on the publicly accessible system for nonpublic information [assignment] and remove such information, if discovered.

## AC-23 Data Mining Protection
Employ [assignment] for [assignment] to detect and protect against unauthorized data mining.

## AC-24 Access Control Decisions
[assignment] to ensure [assignment] are applied to each access request prior to access enforcement.

## AC-24(1) Transmit Access Authorization Information
Transmit [assignment] using [assignment] to [assignment] that enforce access control decisions.

## AC-24(2) No User or Process Identity
Enforce access control decisions based on [assignment] that do not include the identity of the user or process acting on behalf of the user.

## AC-25 Reference Monitor
Implement a reference monitor for [assignment] that is tamperproof, always invoked, and small enough to be subject to analysis and testing, the completeness of which can be assured.
