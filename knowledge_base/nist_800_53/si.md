# NIST SP 800-53 Rev 5 — System and Information Integrity (SI)

_Source: NIST SP 800-53 Rev 5 control catalog (public domain). Each heading is a real control ID for citation._

## SI-1 Policy and Procedures
Develop, document, and disseminate to [assignment]: [assignment] system and information integrity policy that: Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and Procedures to facilitate the implementation of the system and information integrity policy and the associated system and information integrity controls; Designate an [assignment] to manage the development, documentation, and dissemination of the system and information integrity policy and procedures; and Review and update the current system and information integrity: Policy [assignment] and following [assignment] ; and Procedures [assignment] and following [assignment].

## SI-2 Flaw Remediation
Identify, report, and correct system flaws; Test software and firmware updates related to flaw remediation for effectiveness and potential side effects before installation; Install security-relevant software and firmware updates within [assignment] of the release of the updates; and Incorporate flaw remediation into the organizational configuration management process.

## SI-2(2) Automated Flaw Remediation Status
Determine if system components have applicable security-relevant software and firmware updates installed using [assignment] [assignment].

## SI-2(3) Time to Remediate Flaws and Benchmarks for Corrective Actions
Measure the time between flaw identification and flaw remediation; and Establish the following benchmarks for taking corrective actions: [assignment].

## SI-2(4) Automated Patch Management Tools
Employ automated patch management tools to facilitate flaw remediation to the following system components: [assignment].

## SI-2(5) Automatic Software and Firmware Updates
Install [assignment] automatically to [assignment].

## SI-2(6) Removal of Previous Versions of Software and Firmware
Remove previous versions of [assignment] after updated versions have been installed.

## SI-2(7) Root Cause Analysis
Conduct root cause analysis to identify underlying causes of issues or failures. Develop actions to address the root cause of the issue or failure. Implement the actions and monitor the implementation for effectiveness.

## SI-3 Malicious Code Protection
Implement [assignment] malicious code protection mechanisms at system entry and exit points to detect and eradicate malicious code; Automatically update malicious code protection mechanisms as new releases are available in accordance with organizational configuration management policy and procedures; Configure malicious code protection mechanisms to: Perform periodic scans of the system [assignment] and real-time scans of files from external sources at [assignment] as the files are downloaded, opened, or executed in accordance with organizational policy; and [assignment] ; and send alert to [assignment] in response to malicious code detection; and Address the receipt of false positives during malicious code detection and eradication and the resulting potential impact on the availability of the system.

## SI-3(4) Updates Only by Privileged Users
Update malicious code protection mechanisms only when directed by a privileged user.

## SI-3(6) Testing and Verification
Test malicious code protection mechanisms [assignment] by introducing known benign code into the system; and Verify that the detection of the code and the associated incident reporting occur.

## SI-3(8) Detect Unauthorized Commands
Detect the following unauthorized operating system commands through the kernel application programming interface on [assignment]: [assignment] ; and [assignment].

## SI-3(10) Malicious Code Analysis
Employ the following tools and techniques to analyze the characteristics and behavior of malicious code: [assignment] ; and Incorporate the results from malicious code analysis into organizational incident response and flaw remediation processes.

## SI-4 System Monitoring
Monitor the system to detect: Attacks and indicators of potential attacks in accordance with the following monitoring objectives: [assignment] ; and Unauthorized local, network, and remote connections; Identify unauthorized use of the system through the following techniques and methods: [assignment]; Invoke internal monitoring capabilities or deploy monitoring devices: Strategically within the system to collect organization-determined essential information; and At ad hoc locations within the system to track specific types of transactions of interest to the organization; Analyze detected events and anomalies; Adjust the level of system monitoring activity when there is a change in risk to organizational operations and assets, individuals, other organizations, or the Nation; Obtain legal opinion regarding system monitoring activities; and Provide [assignment] to [assignment] [assignment].

## SI-4(1) System-wide Intrusion Detection System
Connect and configure individual intrusion detection tools into a system-wide intrusion detection system.

## SI-4(2) Automated Tools and Mechanisms for Real-time Analysis
Employ automated tools and mechanisms to support near real-time analysis of events.

## SI-4(3) Automated Tool and Mechanism Integration
Employ automated tools and mechanisms to integrate intrusion detection tools and mechanisms into access control and flow control mechanisms.

## SI-4(4) Inbound and Outbound Communications Traffic
Determine criteria for unusual or unauthorized activities or conditions for inbound and outbound communications traffic; Monitor inbound and outbound communications traffic [assignment] for [assignment].

## SI-4(5) System-generated Alerts
Alert [assignment] when the following system-generated indications of compromise or potential compromise occur: [assignment].

## SI-4(7) Automated Response to Suspicious Events
Notify [assignment] of detected suspicious events; and Take the following actions upon detection: [assignment].

## SI-4(9) Testing of Monitoring Tools and Mechanisms
Test intrusion-monitoring tools and mechanisms [assignment].

## SI-4(10) Visibility of Encrypted Communications
Make provisions so that [assignment] is visible to [assignment].

## SI-4(11) Analyze Communications Traffic Anomalies
Analyze outbound communications traffic at the external interfaces to the system and selected [assignment] to discover anomalies.

## SI-4(12) Automated Organization-generated Alerts
Alert [assignment] using [assignment] when the following indications of inappropriate or unusual activities with security or privacy implications occur: [assignment].

## SI-4(13) Analyze Traffic and Event Patterns
Analyze communications traffic and event patterns for the system; Develop profiles representing common traffic and event patterns; and Use the traffic and event profiles in tuning system-monitoring devices.

## SI-4(14) Wireless Intrusion Detection
Employ a wireless intrusion detection system to identify rogue wireless devices and to detect attack attempts and potential compromises or breaches to the system.

## SI-4(15) Wireless to Wireline Communications
Employ an intrusion detection system to monitor wireless communications traffic as the traffic passes from wireless to wireline networks.

## SI-4(16) Correlate Monitoring Information
Correlate information from monitoring tools and mechanisms employed throughout the system.

## SI-4(17) Integrated Situational Awareness
Correlate information from monitoring physical, cyber, and supply chain activities to achieve integrated, organization-wide situational awareness.

## SI-4(18) Analyze Traffic and Covert Exfiltration
Analyze outbound communications traffic at external interfaces to the system and at the following interior points to detect covert exfiltration of information: [assignment].

## SI-4(19) Risk for Individuals
Implement [assignment] of individuals who have been identified by [assignment] as posing an increased level of risk.

## SI-4(20) Privileged Users
Implement the following additional monitoring of privileged users: [assignment].

## SI-4(21) Probationary Periods
Implement the following additional monitoring of individuals during [assignment]: [assignment].

## SI-4(22) Unauthorized Network Services
Detect network services that have not been authorized or approved by [assignment] ; and [assignment] when detected.

## SI-4(23) Host-based Devices
Implement the following host-based monitoring mechanisms at [assignment]: [assignment].

## SI-4(24) Indicators of Compromise
Discover, collect, and distribute to [assignment] , indicators of compromise provided by [assignment].

## SI-4(25) Optimize Network Traffic Analysis
Provide visibility into network traffic at external and key internal system interfaces to optimize the effectiveness of monitoring devices.

## SI-5 Security Alerts, Advisories, and Directives
Receive system security alerts, advisories, and directives from [assignment] on an ongoing basis; Generate internal security alerts, advisories, and directives as deemed necessary; Disseminate security alerts, advisories, and directives to: [assignment] ; and Implement security directives in accordance with established time frames, or notify the issuing organization of the degree of noncompliance.

## SI-5(1) Automated Alerts and Advisories
Broadcast security alert and advisory information throughout the organization using [assignment].

## SI-6 Security and Privacy Function Verification
Verify the correct operation of [assignment]; Perform the verification of the functions specified in SI-6a [assignment]; Alert [assignment] to failed security and privacy verification tests; and [assignment] when anomalies are discovered.

## SI-6(2) Automation Support for Distributed Testing
Implement automated mechanisms to support the management of distributed security and privacy function testing.

## SI-6(3) Report Verification Results
Report the results of security and privacy function verification to [assignment].

## SI-7 Software, Firmware, and Information Integrity
Employ integrity verification tools to detect unauthorized changes to the following software, firmware, and information: [assignment] ; and Take the following actions when unauthorized changes to the software, firmware, and information are detected: [assignment].

## SI-7(1) Integrity Checks
Perform an integrity check of [assignment] [assignment].

## SI-7(2) Automated Notifications of Integrity Violations
Employ automated tools that provide notification to [assignment] upon discovering discrepancies during integrity verification.

## SI-7(3) Centrally Managed Integrity Tools
Employ centrally managed integrity verification tools.

## SI-7(5) Automated Response to Integrity Violations
Automatically [assignment] when integrity violations are discovered.

## SI-7(6) Cryptographic Protection
Implement cryptographic mechanisms to detect unauthorized changes to software, firmware, and information.

## SI-7(7) Integration of Detection and Response
Incorporate the detection of the following unauthorized changes into the organizational incident response capability: [assignment].

## SI-7(8) Auditing Capability for Significant Events
Upon detection of a potential integrity violation, provide the capability to audit the event and initiate the following actions: [assignment].

## SI-7(9) Verify Boot Process
Verify the integrity of the boot process of the following system components: [assignment].

## SI-7(10) Protection of Boot Firmware
Implement the following mechanisms to protect the integrity of boot firmware in [assignment]: [assignment].

## SI-7(12) Integrity Verification
Require that the integrity of the following user-installed software be verified prior to execution: [assignment].

## SI-7(15) Code Authentication
Implement cryptographic mechanisms to authenticate the following software or firmware components prior to installation: [assignment].

## SI-7(16) Time Limit on Process Execution Without Supervision
Prohibit processes from executing without supervision for more than [assignment].

## SI-7(17) Runtime Application Self-protection
Implement [assignment] for application self-protection at runtime.

## SI-8 Spam Protection
Employ spam protection mechanisms at system entry and exit points to detect and act on unsolicited messages; and Update spam protection mechanisms when new releases are available in accordance with organizational configuration management policy and procedures.

## SI-8(2) Automatic Updates
Automatically update spam protection mechanisms [assignment].

## SI-8(3) Continuous Learning Capability
Implement spam protection mechanisms with a learning capability to more effectively identify legitimate communications traffic.

## SI-10 Information Input Validation
Check the validity of the following information inputs: [assignment].

## SI-10(1) Manual Override Capability
Provide a manual override capability for input validation of the following information inputs: [assignment]; Restrict the use of the manual override capability to only [assignment] ; and Audit the use of the manual override capability.

## SI-10(2) Review and Resolve Errors
Review and resolve input validation errors within [assignment].

## SI-10(3) Predictable Behavior
Verify that the system behaves in a predictable and documented manner when invalid inputs are received.

## SI-10(4) Timing Interactions
Account for timing interactions among system components in determining appropriate responses for invalid inputs.

## SI-10(5) Restrict Inputs to Trusted Sources and Approved Formats
Restrict the use of information inputs to [assignment] and/or [assignment].

## SI-10(6) Injection Prevention
Prevent untrusted data injections.

## SI-11 Error Handling
Generate error messages that provide information necessary for corrective actions without revealing information that could be exploited; and Reveal error messages only to [assignment].

## SI-12 Information Management and Retention
Manage and retain information within the system and information output from the system in accordance with applicable laws, executive orders, directives, regulations, policies, standards, guidelines and operational requirements.

## SI-12(1) Limit Personally Identifiable Information Elements
Limit personally identifiable information being processed in the information life cycle to the following elements of personally identifiable information: [assignment].

## SI-12(2) Minimize Personally Identifiable Information in Testing, Training, and Research
Use the following techniques to minimize the use of personally identifiable information for research, testing, or training: [assignment].

## SI-12(3) Information Disposal
Use the following techniques to dispose of, destroy, or erase information following the retention period: [assignment].

## SI-13 Predictable Failure Prevention
Determine mean time to failure (MTTF) for the following system components in specific environments of operation: [assignment] ; and Provide substitute system components and a means to exchange active and standby components in accordance with the following criteria: [assignment].

## SI-13(1) Transferring Component Responsibilities
Take system components out of service by transferring component responsibilities to substitute components no later than [assignment] of mean time to failure.

## SI-13(3) Manual Transfer Between Components
Manually initiate transfers between active and standby system components when the use of the active component reaches [assignment] of the mean time to failure.

## SI-13(4) Standby Component Installation and Notification
If system component failures are detected: Ensure that the standby components are successfully and transparently installed within [assignment] ; and [assignment].

## SI-13(5) Failover Capability
Provide [assignment] [assignment] for the system.

## SI-14 Non-persistence
Implement non-persistent [assignment] that are initiated in a known state and terminated [assignment].

## SI-14(1) Refresh from Trusted Sources
Obtain software and data employed during system component and service refreshes from the following trusted sources: [assignment].

## SI-14(2) Non-persistent Information
[assignment] ; and Delete information when no longer needed.

## SI-14(3) Non-persistent Connectivity
Establish connections to the system on demand and terminate connections after [assignment].

## SI-15 Information Output Filtering
Validate information output from the following software programs and/or applications to ensure that the information is consistent with the expected content: [assignment].

## SI-16 Memory Protection
Implement the following controls to protect the system memory from unauthorized code execution: [assignment].

## SI-17 Fail-safe Procedures
Implement the indicated fail-safe procedures when the indicated failures occur: [assignment].

## SI-18 Personally Identifiable Information Quality Operations
Check the accuracy, relevance, timeliness, and completeness of personally identifiable information across the information life cycle [assignment] ; and Correct or delete inaccurate or outdated personally identifiable information.

## SI-18(1) Automation Support
Correct or delete personally identifiable information that is inaccurate or outdated, incorrectly determined regarding impact, or incorrectly de-identified using [assignment].

## SI-18(2) Data Tags
Employ data tags to automate the correction or deletion of personally identifiable information across the information life cycle within organizational systems.

## SI-18(3) Collection
Collect personally identifiable information directly from the individual.

## SI-18(4) Individual Requests
Correct or delete personally identifiable information upon request by individuals or their designated representatives.

## SI-18(5) Notice of Correction or Deletion
Notify [assignment] and individuals that the personally identifiable information has been corrected or deleted.

## SI-19 De-identification
Remove the following elements of personally identifiable information from datasets: [assignment] ; and Evaluate [assignment] for effectiveness of de-identification.

## SI-19(1) Collection
De-identify the dataset upon collection by not collecting personally identifiable information.

## SI-19(2) Archiving
Prohibit archiving of personally identifiable information elements if those elements in a dataset will not be needed after the dataset is archived.

## SI-19(3) Release
Remove personally identifiable information elements from a dataset prior to its release if those elements in the dataset do not need to be part of the data release.

## SI-19(4) Removal, Masking, Encryption, Hashing, or Replacement of Direct Identifiers
Remove, mask, encrypt, hash, or replace direct identifiers in a dataset.

## SI-19(5) Statistical Disclosure Control
Manipulate numerical data, contingency tables, and statistical findings so that no individual or organization is identifiable in the results of the analysis.

## SI-19(6) Differential Privacy
Prevent disclosure of personally identifiable information by adding non-deterministic noise to the results of mathematical operations before the results are reported.

## SI-19(7) Validated Algorithms and Software
Perform de-identification using validated algorithms and software that is validated to implement the algorithms.

## SI-19(8) Motivated Intruder
Perform a motivated intruder test on the de-identified dataset to determine if the identified data remains or if the de-identified data can be re-identified.

## SI-20 Tainting
Embed data or capabilities in the following systems or system components to determine if organizational data has been exfiltrated or improperly removed from the organization: [assignment].

## SI-21 Information Refresh
Refresh [assignment] at [assignment] or generate the information on demand and delete the information when no longer needed.

## SI-22 Information Diversity
Identify the following alternative sources of information for [assignment]: [assignment] ; and Use an alternative information source for the execution of essential functions or services on [assignment] when the primary source of information is corrupted or unavailable.

## SI-23 Information Fragmentation
Based on [assignment]: Fragment the following information: [assignment] ; and Distribute the fragmented information across the following systems or system components: [assignment].
