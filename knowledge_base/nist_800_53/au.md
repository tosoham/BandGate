# NIST SP 800-53 Rev 5 — Audit and Accountability (AU)

_Source: NIST SP 800-53 Rev 5 control catalog (public domain). Each heading is a real control ID for citation._

## AU-1 Policy and Procedures
Develop, document, and disseminate to [assignment]: [assignment] audit and accountability policy that: Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and Procedures to facilitate the implementation of the audit and accountability policy and the associated audit and accountability controls; Designate an [assignment] to manage the development, documentation, and dissemination of the audit and accountability policy and procedures; and Review and update the current audit and accountability: Policy [assignment] and following [assignment] ; and Procedures [assignment] and following [assignment].

## AU-2 Event Logging
Identify the types of events that the system is capable of logging in support of the audit function: [assignment]; Coordinate the event logging function with other organizational entities requiring audit-related information to guide and inform the selection criteria for events to be logged; Specify the following event types for logging within the system: [assignment]; Provide a rationale for why the event types selected for logging are deemed to be adequate to support after-the-fact investigations of incidents; and Review and update the event types selected for logging [assignment].

## AU-3 Content of Audit Records
Ensure that audit records contain information that establishes the following: What type of event occurred; When the event occurred; Where the event occurred; Source of the event; Outcome of the event; and Identity of any individuals, subjects, or objects/entities associated with the event.

## AU-3(1) Additional Audit Information
Generate audit records containing the following additional information: [assignment].

## AU-3(3) Limit Personally Identifiable Information Elements
Limit personally identifiable information contained in audit records to the following elements identified in the privacy risk assessment: [assignment].

## AU-4 Audit Log Storage Capacity
Allocate audit log storage capacity to accommodate [assignment].

## AU-4(1) Transfer to Alternate Storage
Transfer audit logs [assignment] to a different system, system component, or media other than the system or system component conducting the logging.

## AU-5 Response to Audit Logging Process Failures
Alert [assignment] within [assignment] in the event of an audit logging process failure; and Take the following additional actions: [assignment].

## AU-5(1) Storage Capacity Warning
Provide a warning to [assignment] within [assignment] when allocated audit log storage volume reaches [assignment] of repository maximum audit log storage capacity.

## AU-5(2) Real-time Alerts
Provide an alert within [assignment] to [assignment] when the following audit failure events occur: [assignment].

## AU-5(3) Configurable Traffic Volume Thresholds
Enforce configurable network communications traffic volume thresholds reflecting limits on audit log storage capacity and [assignment] network traffic above those thresholds.

## AU-5(4) Shutdown on Failure
Invoke a [assignment] in the event of [assignment] , unless an alternate audit logging capability exists.

## AU-5(5) Alternate Audit Logging Capability
Provide an alternate audit logging capability in the event of a failure in primary audit logging capability that implements [assignment].

## AU-6 Audit Record Review, Analysis, and Reporting
Review and analyze system audit records [assignment] for indications of [assignment] and the potential impact of the inappropriate or unusual activity; Report findings to [assignment] ; and Adjust the level of audit record review, analysis, and reporting within the system when there is a change in risk based on law enforcement information, intelligence information, or other credible sources of information.

## AU-6(1) Automated Process Integration
Integrate audit record review, analysis, and reporting processes using [assignment].

## AU-6(3) Correlate Audit Record Repositories
Analyze and correlate audit records across different repositories to gain organization-wide situational awareness.

## AU-6(4) Central Review and Analysis
Provide and implement the capability to centrally review and analyze audit records from multiple components within the system.

## AU-6(5) Integrated Analysis of Audit Records
Integrate analysis of audit records with analysis of [assignment] to further enhance the ability to identify inappropriate or unusual activity.

## AU-6(6) Correlation with Physical Monitoring
Correlate information from audit records with information obtained from monitoring physical access to further enhance the ability to identify suspicious, inappropriate, unusual, or malevolent activity.

## AU-6(7) Permitted Actions
Specify the permitted actions for each [assignment] associated with the review, analysis, and reporting of audit record information.

## AU-6(8) Full Text Analysis of Privileged Commands
Perform a full text analysis of logged privileged commands in a physically distinct component or subsystem of the system, or other system that is dedicated to that analysis.

## AU-6(9) Correlation with Information from Nontechnical Sources
Correlate information from nontechnical sources with audit record information to enhance organization-wide situational awareness.

## AU-7 Audit Record Reduction and Report Generation
Provide and implement an audit record reduction and report generation capability that: Supports on-demand audit record review, analysis, and reporting requirements and after-the-fact investigations of incidents; and Does not alter the original content or time ordering of audit records.

## AU-7(1) Automatic Processing
Provide and implement the capability to process, sort, and search audit records for events of interest based on the following content: [assignment].

## AU-8 Time Stamps
Use internal system clocks to generate time stamps for audit records; and Record time stamps for audit records that meet [assignment] and that use Coordinated Universal Time, have a fixed local time offset from Coordinated Universal Time, or that include the local time offset as part of the time stamp.

## AU-9 Protection of Audit Information
Protect audit information and audit logging tools from unauthorized access, modification, and deletion; and Alert [assignment] upon detection of unauthorized access, modification, or deletion of audit information.

## AU-9(1) Hardware Write-once Media
Write audit trails to hardware-enforced, write-once media.

## AU-9(2) Store on Separate Physical Systems or Components
Store audit records [assignment] in a repository that is part of a physically different system or system component than the system or component being audited.

## AU-9(3) Cryptographic Protection
Implement cryptographic mechanisms to protect the integrity of audit information and audit tools.

## AU-9(4) Access by Subset of Privileged Users
Authorize access to management of audit logging functionality to only [assignment].

## AU-9(5) Dual Authorization
Enforce dual authorization for [assignment] of [assignment].

## AU-9(6) Read-only Access
Authorize read-only access to audit information to [assignment].

## AU-9(7) Store on Component with Different Operating System
Store audit information on a component running a different operating system than the system or component being audited.

## AU-10 Non-repudiation
Provide irrefutable evidence that an individual (or process acting on behalf of an individual) has performed [assignment].

## AU-10(1) Association of Identities
Bind the identity of the information producer with the information to [assignment] ; and Provide the means for authorized individuals to determine the identity of the producer of the information.

## AU-10(2) Validate Binding of Information Producer Identity
Validate the binding of the information producer identity to the information at [assignment] ; and Perform [assignment] in the event of a validation error.

## AU-10(3) Chain of Custody
Maintain reviewer or releaser credentials within the established chain of custody for information reviewed or released.

## AU-10(4) Validate Binding of Information Reviewer Identity
Validate the binding of the information reviewer identity to the information at the transfer or release points prior to release or transfer between [assignment] ; and Perform [assignment] in the event of a validation error.

## AU-11 Audit Record Retention
Retain audit records for [assignment] to provide support for after-the-fact investigations of incidents and to meet regulatory and organizational information retention requirements.

## AU-11(1) Long-term Retrieval Capability
Employ [assignment] to ensure that long-term audit records generated by the system can be retrieved.

## AU-12 Audit Record Generation
Provide audit record generation capability for the event types the system is capable of auditing as defined in [AU-2a](#au-2_smt.a) on [assignment]; Allow [assignment] to select the event types that are to be logged by specific components of the system; and Generate audit records for the event types defined in [AU-2c](#au-2_smt.c) that include the audit record content defined in [AU-3](#au-3).

## AU-12(1) System-wide and Time-correlated Audit Trail
Compile audit records from [assignment] into a system-wide (logical or physical) audit trail that is time-correlated to within [assignment].

## AU-12(2) Standardized Formats
Produce a system-wide (logical or physical) audit trail composed of audit records in a standardized format.

## AU-12(3) Changes by Authorized Individuals
Provide and implement the capability for [assignment] to change the logging to be performed on [assignment] based on [assignment] within [assignment].

## AU-12(4) Query Parameter Audits of Personally Identifiable Information
Provide and implement the capability for auditing the parameters of user query events for data sets containing personally identifiable information.

## AU-13 Monitoring for Information Disclosure
Monitor [assignment] [assignment] for evidence of unauthorized disclosure of organizational information; and If an information disclosure is discovered: Notify [assignment] ; and Take the following additional actions: [assignment].

## AU-13(1) Use of Automated Tools
Monitor open-source information and information sites using [assignment].

## AU-13(2) Review of Monitored Sites
Review the list of open-source information sites being monitored [assignment].

## AU-13(3) Unauthorized Replication of Information
Employ discovery techniques, processes, and tools to determine if external entities are replicating organizational information in an unauthorized manner.

## AU-14 Session Audit
Provide and implement the capability for [assignment] to [assignment] the content of a user session under [assignment] ; and Develop, integrate, and use session auditing activities in consultation with legal counsel and in accordance with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines.

## AU-14(1) System Start-up
Initiate session audits automatically at system start-up.

## AU-14(3) Remote Viewing and Listening
Provide and implement the capability for authorized users to remotely view and hear content related to an established user session in real time.

## AU-16 Cross-organizational Audit Logging
Employ [assignment] for coordinating [assignment] among external organizations when audit information is transmitted across organizational boundaries.

## AU-16(1) Identity Preservation
Preserve the identity of individuals in cross-organizational audit trails.

## AU-16(2) Sharing of Audit Information
Provide cross-organizational audit information to [assignment] based on [assignment].

## AU-16(3) Disassociability
Implement [assignment] to disassociate individuals from audit information transmitted across organizational boundaries.
