# NIST SP 800-53 Rev 5 — System and Communications Protection (SC)

_Source: NIST SP 800-53 Rev 5 control catalog (public domain). Each heading is a real control ID for citation._

## SC-1 Policy and Procedures
Develop, document, and disseminate to [assignment]: [assignment] system and communications protection policy that: Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and Procedures to facilitate the implementation of the system and communications protection policy and the associated system and communications protection controls; Designate an [assignment] to manage the development, documentation, and dissemination of the system and communications protection policy and procedures; and Review and update the current system and communications protection: Policy [assignment] and following [assignment] ; and Procedures [assignment] and following [assignment].

## SC-2 Separation of System and User Functionality
Separate user functionality, including user interface services, from system management functionality.

## SC-2(1) Interfaces for Non-privileged Users
Prevent the presentation of system management functionality at interfaces to non-privileged users.

## SC-2(2) Disassociability
Store state information from applications and software separately.

## SC-3 Security Function Isolation
Isolate security functions from nonsecurity functions.

## SC-3(1) Hardware Separation
Employ hardware separation mechanisms to implement security function isolation.

## SC-3(2) Access and Flow Control Functions
Isolate security functions enforcing access and information flow control from nonsecurity functions and from other security functions.

## SC-3(3) Minimize Nonsecurity Functionality
Minimize the number of nonsecurity functions included within the isolation boundary containing security functions.

## SC-3(4) Module Coupling and Cohesiveness
Implement security functions as largely independent modules that maximize internal cohesiveness within modules and minimize coupling between modules.

## SC-3(5) Layered Structures
Implement security functions as a layered structure minimizing interactions between layers of the design and avoiding any dependence by lower layers on the functionality or correctness of higher layers.

## SC-4 Information in Shared System Resources
Prevent unauthorized and unintended information transfer via shared system resources.

## SC-4(2) Multilevel or Periods Processing
Prevent unauthorized information transfer via shared resources in accordance with [assignment] when system processing explicitly switches between different information classification levels or security categories.

## SC-5 Denial-of-service Protection
[assignment] the effects of the following types of denial-of-service events: [assignment] ; and Employ the following controls to achieve the denial-of-service objective: [assignment].

## SC-5(1) Restrict Ability to Attack Other Systems
Restrict the ability of individuals to launch the following denial-of-service attacks against other systems: [assignment].

## SC-5(2) Capacity, Bandwidth, and Redundancy
Manage capacity, bandwidth, or other redundancy to limit the effects of information flooding denial-of-service attacks.

## SC-5(3) Detection and Monitoring
Employ the following monitoring tools to detect indicators of denial-of-service attacks against, or launched from, the system: [assignment] ; and Monitor the following system resources to determine if sufficient resources exist to prevent effective denial-of-service attacks: [assignment].

## SC-6 Resource Availability
Protect the availability of resources by allocating [assignment] by [assignment].

## SC-7 Boundary Protection
Monitor and control communications at the external managed interfaces to the system and at key internal managed interfaces within the system; Implement subnetworks for publicly accessible system components that are [assignment] separated from internal organizational networks; and Connect to external networks or systems only through managed interfaces consisting of boundary protection devices arranged in accordance with an organizational security and privacy architecture.

## SC-7(3) Access Points
Limit the number of external network connections to the system.

## SC-7(4) External Telecommunications Services
Implement a managed interface for each external telecommunication service; Establish a traffic flow policy for each managed interface; Protect the confidentiality and integrity of the information being transmitted across each interface; Document each exception to the traffic flow policy with a supporting mission or business need and duration of that need; Review exceptions to the traffic flow policy [assignment] and remove exceptions that are no longer supported by an explicit mission or business need; Prevent unauthorized exchange of control plane traffic with external networks; Publish information to enable remote networks to detect unauthorized control plane traffic from internal networks; and Filter unauthorized control plane traffic from external networks.

## SC-7(5) Deny by Default — Allow by Exception
Deny network communications traffic by default and allow network communications traffic by exception [assignment].

## SC-7(7) Split Tunneling for Remote Devices
Prevent split tunneling for remote devices connecting to organizational systems unless the split tunnel is securely provisioned using [assignment].

## SC-7(8) Route Traffic to Authenticated Proxy Servers
Route [assignment] to [assignment] through authenticated proxy servers at managed interfaces.

## SC-7(9) Restrict Threatening Outgoing Communications Traffic
Detect and deny outgoing communications traffic posing a threat to external systems; and Audit the identity of internal users associated with denied communications.

## SC-7(10) Prevent Exfiltration
Prevent the exfiltration of information; and Conduct exfiltration tests [assignment].

## SC-7(11) Restrict Incoming Communications Traffic
Only allow incoming communications from [assignment] to be routed to [assignment].

## SC-7(12) Host-based Protection
Implement [assignment] at [assignment].

## SC-7(13) Isolation of Security Tools, Mechanisms, and Support Components
Isolate [assignment] from other internal system components by implementing physically separate subnetworks with managed interfaces to other components of the system.

## SC-7(14) Protect Against Unauthorized Physical Connections
Protect against unauthorized physical connections at [assignment].

## SC-7(15) Networked Privileged Accesses
Route networked, privileged accesses through a dedicated, managed interface for purposes of access control and auditing.

## SC-7(16) Prevent Discovery of System Components
Prevent the discovery of specific system components that represent a managed interface.

## SC-7(17) Automated Enforcement of Protocol Formats
Enforce adherence to protocol formats.

## SC-7(18) Fail Secure
Prevent systems from entering unsecure states in the event of an operational failure of a boundary protection device.

## SC-7(19) Block Communication from Non-organizationally Configured Hosts
Block inbound and outbound communications traffic between [assignment] that are independently configured by end users and external service providers.

## SC-7(20) Dynamic Isolation and Segregation
Provide the capability to dynamically isolate [assignment] from other system components.

## SC-7(21) Isolation of System Components
Employ boundary protection mechanisms to isolate [assignment] supporting [assignment].

## SC-7(22) Separate Subnets for Connecting to Different Security Domains
Implement separate network addresses to connect to systems in different security domains.

## SC-7(23) Disable Sender Feedback on Protocol Validation Failure
Disable feedback to senders on protocol format validation failure.

## SC-7(24) Personally Identifiable Information
For systems that process personally identifiable information: Apply the following processing rules to data elements of personally identifiable information: [assignment]; Monitor for permitted processing at the external interfaces to the system and at key internal boundaries within the system; Document each processing exception; and Review and remove exceptions that are no longer supported.

## SC-7(25) Unclassified National Security System Connections
Prohibit the direct connection of [assignment] to an external network without the use of [assignment].

## SC-7(26) Classified National Security System Connections
Prohibit the direct connection of a classified national security system to an external network without the use of [assignment].

## SC-7(27) Unclassified Non-national Security System Connections
Prohibit the direct connection of [assignment] to an external network without the use of [assignment].

## SC-7(28) Connections to Public Networks
Prohibit the direct connection of [assignment] to a public network.

## SC-7(29) Separate Subnets to Isolate Functions
Implement [assignment] separate subnetworks to isolate the following critical system components and functions: [assignment].

## SC-8 Transmission Confidentiality and Integrity
Protect the [assignment] of transmitted information.

## SC-8(1) Cryptographic Protection
Implement cryptographic mechanisms to [assignment] during transmission.

## SC-8(2) Pre- and Post-transmission Handling
Maintain the [assignment] of information during preparation for transmission and during reception.

## SC-8(3) Cryptographic Protection for Message Externals
Implement cryptographic mechanisms to protect message externals unless otherwise protected by [assignment].

## SC-8(4) Conceal or Randomize Communications
Implement cryptographic mechanisms to conceal or randomize communication patterns unless otherwise protected by [assignment].

## SC-8(5) Protected Distribution System
Implement [assignment] to [assignment] during transmission.

## SC-10 Network Disconnect
Terminate the network connection associated with a communications session at the end of the session or after [assignment] of inactivity.

## SC-11 Trusted Path
Provide a [assignment] isolated trusted communications path for communications between the user and the trusted components of the system; and Permit users to invoke the trusted communications path for communications between the user and the following security functions of the system, including at a minimum, authentication and re-authentication: [assignment].

## SC-11(1) Irrefutable Communications Path
Provide a trusted communications path that is irrefutably distinguishable from other communications paths; and Initiate the trusted communications path for communications between the [assignment] of the system and the user.

## SC-12 Cryptographic Key Establishment and Management
Establish and manage cryptographic keys when cryptography is employed within the system in accordance with the following key management requirements: [assignment].

## SC-12(1) Availability
Maintain availability of information in the event of the loss of cryptographic keys by users.

## SC-12(2) Symmetric Keys
Produce, control, and distribute symmetric cryptographic keys using [assignment] key management technology and processes.

## SC-12(3) Asymmetric Keys
Produce, control, and distribute asymmetric cryptographic keys using [assignment].

## SC-12(6) Physical Control of Keys
Maintain physical control of cryptographic keys when stored information is encrypted by external service providers.

## SC-13 Cryptographic Protection
Determine the [assignment] ; and Implement the following types of cryptography required for each specified cryptographic use: [assignment].

## SC-15 Collaborative Computing Devices and Applications
Prohibit remote activation of collaborative computing devices and applications with the following exceptions: [assignment] ; and Provide an explicit indication of use to users physically present at the devices.

## SC-15(1) Physical or Logical Disconnect
Provide [assignment] disconnect of collaborative computing devices in a manner that supports ease of use.

## SC-15(3) Disabling and Removal in Secure Work Areas
Disable or remove collaborative computing devices and applications from [assignment] in [assignment].

## SC-15(4) Explicitly Indicate Current Participants
Provide an explicit indication of current participants in [assignment].

## SC-16 Transmission of Security and Privacy Attributes
Associate [assignment] with information exchanged between systems and between system components.

## SC-16(1) Integrity Verification
Verify the integrity of transmitted security and privacy attributes.

## SC-16(2) Anti-spoofing Mechanisms
Implement anti-spoofing mechanisms to prevent adversaries from falsifying the security attributes indicating the successful application of the security process.

## SC-16(3) Cryptographic Binding
Implement [assignment] to bind security and privacy attributes to transmitted information.

## SC-17 Public Key Infrastructure Certificates
Issue public key certificates under an [assignment] or obtain public key certificates from an approved service provider; and Include only approved trust anchors in trust stores or certificate stores managed by the organization.

## SC-18 Mobile Code
Define acceptable and unacceptable mobile code and mobile code technologies; and Authorize, monitor, and control the use of mobile code within the system.

## SC-18(1) Identify Unacceptable Code and Take Corrective Actions
Identify [assignment] and take [assignment].

## SC-18(2) Acquisition, Development, and Use
Verify that the acquisition, development, and use of mobile code to be deployed in the system meets [assignment].

## SC-18(3) Prevent Downloading and Execution
Prevent the download and execution of [assignment].

## SC-18(4) Prevent Automatic Execution
Prevent the automatic execution of mobile code in [assignment] and enforce [assignment] prior to executing the code.

## SC-18(5) Allow Execution Only in Confined Environments
Allow execution of permitted mobile code only in confined virtual machine environments.

## SC-19 Voice Over Internet Protocol
Technology-specific; addressed as any other technology or protocol.

## SC-20 Secure Name/Address Resolution Service (Authoritative Source)
Provide additional data origin authentication and integrity verification artifacts along with the authoritative name resolution data the system returns in response to external name/address resolution queries; and Provide the means to indicate the security status of child zones and (if the child supports secure resolution services) to enable verification of a chain of trust among parent and child domains, when operating as part of a distributed, hierarchical namespace.

## SC-20(2) Data Origin and Integrity
Provide data origin and integrity protection artifacts for internal name/address resolution queries.

## SC-21 Secure Name/Address Resolution Service (Recursive or Caching Resolver)
Request and perform data origin authentication and data integrity verification on the name/address resolution responses the system receives from authoritative sources.

## SC-22 Architecture and Provisioning for Name/Address Resolution Service
Ensure the systems that collectively provide name/address resolution service for an organization are fault-tolerant and implement internal and external role separation.

## SC-23 Session Authenticity
Protect the authenticity of communications sessions.

## SC-23(1) Invalidate Session Identifiers at Logout
Invalidate session identifiers upon user logout or other session termination.

## SC-23(3) Unique System-generated Session Identifiers
Generate a unique session identifier for each session with [assignment] and recognize only session identifiers that are system-generated.

## SC-23(5) Allowed Certificate Authorities
Only allow the use of [assignment] for verification of the establishment of protected sessions.

## SC-24 Fail in Known State
Fail to a [assignment] for the following failures on the indicated components while preserving [assignment] in failure: [assignment].

## SC-25 Thin Nodes
Employ minimal functionality and information storage on the following system components: [assignment].

## SC-26 Decoys
Include components within organizational systems specifically designed to be the target of malicious attacks for detecting, deflecting, and analyzing such attacks.

## SC-27 Platform-independent Applications
Include within organizational systems the following platform independent applications: [assignment].

## SC-28 Protection of Information at Rest
Protect the [assignment] of the following information at rest: [assignment].

## SC-28(1) Cryptographic Protection
Implement cryptographic mechanisms to prevent unauthorized disclosure and modification of the following information at rest on [assignment]: [assignment].

## SC-28(2) Offline Storage
Remove the following information from online storage and store offline in a secure location: [assignment].

## SC-28(3) Cryptographic Keys
Provide protected storage for cryptographic keys [assignment].

## SC-29 Heterogeneity
Employ a diverse set of information technologies for the following system components in the implementation of the system: [assignment].

## SC-29(1) Virtualization Techniques
Employ virtualization techniques to support the deployment of a diversity of operating systems and applications that are changed [assignment].

## SC-30 Concealment and Misdirection
Employ the following concealment and misdirection techniques for [assignment] at [assignment] to confuse and mislead adversaries: [assignment].

## SC-30(2) Randomness
Employ [assignment] to introduce randomness into organizational operations and assets.

## SC-30(3) Change Processing and Storage Locations
Change the location of [assignment] [assignment]].

## SC-30(4) Misleading Information
Employ realistic, but misleading information in [assignment] about its security state or posture.

## SC-30(5) Concealment of System Components
Employ the following techniques to hide or conceal [assignment]: [assignment].

## SC-31 Covert Channel Analysis
Perform a covert channel analysis to identify those aspects of communications within the system that are potential avenues for covert [assignment] channels; and Estimate the maximum bandwidth of those channels.

## SC-31(1) Test Covert Channels for Exploitability
Test a subset of the identified covert channels to determine the channels that are exploitable.

## SC-31(2) Maximum Bandwidth
Reduce the maximum bandwidth for identified covert [assignment] channels to [assignment].

## SC-31(3) Measure Bandwidth in Operational Environments
Measure the bandwidth of [assignment] in the operational environment of the system.

## SC-32 System Partitioning
Partition the system into [assignment] residing in separate [assignment] domains or environments based on [assignment].

## SC-32(1) Separate Physical Domains for Privileged Functions
Partition privileged functions into separate physical domains.

## SC-34 Non-modifiable Executable Programs
For [assignment] , load and execute: The operating environment from hardware-enforced, read-only media; and The following applications from hardware-enforced, read-only media: [assignment].

## SC-34(1) No Writable Storage
Employ [assignment] with no writeable storage that is persistent across component restart or power on/off.

## SC-34(2) Integrity Protection on Read-only Media
Protect the integrity of information prior to storage on read-only media and control the media after such information has been recorded onto the media.

## SC-35 External Malicious Code Identification
Include system components that proactively seek to identify network-based malicious code or malicious websites.

## SC-36 Distributed Processing and Storage
Distribute the following processing and storage components across multiple [assignment]: [assignment].

## SC-36(1) Polling Techniques
Employ polling techniques to identify potential faults, errors, or compromises to the following processing and storage components: [assignment] ; and Take the following actions in response to identified faults, errors, or compromises: [assignment].

## SC-36(2) Synchronization
Synchronize the following duplicate systems or system components: [assignment].

## SC-37 Out-of-band Channels
Employ the following out-of-band channels for the physical delivery or electronic transmission of [assignment] to [assignment]: [assignment].

## SC-37(1) Ensure Delivery and Transmission
Employ [assignment] to ensure that only [assignment] receive the following information, system components, or devices: [assignment].

## SC-38 Operations Security
Employ the following operations security controls to protect key organizational information throughout the system development life cycle: [assignment].

## SC-39 Process Isolation
Maintain a separate execution domain for each executing system process.

## SC-39(1) Hardware Separation
Implement hardware separation mechanisms to facilitate process isolation.

## SC-39(2) Separate Execution Domain Per Thread
Maintain a separate execution domain for each thread in [assignment].

## SC-40 Wireless Link Protection
Protect external and internal [assignment] from the following signal parameter attacks: [assignment].

## SC-40(1) Electromagnetic Interference
Implement cryptographic mechanisms that achieve [assignment] against the effects of intentional electromagnetic interference.

## SC-40(2) Reduce Detection Potential
Implement cryptographic mechanisms to reduce the detection potential of wireless links to [assignment].

## SC-40(3) Imitative or Manipulative Communications Deception
Implement cryptographic mechanisms to identify and reject wireless transmissions that are deliberate attempts to achieve imitative or manipulative communications deception based on signal parameters.

## SC-40(4) Signal Parameter Identification
Implement cryptographic mechanisms to prevent the identification of [assignment] by using the transmitter signal parameters.

## SC-41 Port and I/O Device Access
[assignment] disable or remove [assignment] on the following systems or system components: [assignment].

## SC-42 Sensor Capability and Data
Prohibit [assignment] ; and Provide an explicit indication of sensor use to [assignment].

## SC-42(1) Reporting to Authorized Individuals or Roles
Verify that the system is configured so that data or information collected by the [assignment] is only reported to authorized individuals or roles.

## SC-42(2) Authorized Use
Employ the following measures so that data or information collected by [assignment] is only used for authorized purposes: [assignment].

## SC-42(4) Notice of Collection
Employ the following measures to facilitate an individual’s awareness that personally identifiable information is being collected by [assignment]: [assignment].

## SC-42(5) Collection Minimization
Employ [assignment] that are configured to minimize the collection of information about individuals that is not needed.

## SC-43 Usage Restrictions
Establish usage restrictions and implementation guidelines for the following system components: [assignment] ; and Authorize, monitor, and control the use of such components within the system.

## SC-44 Detonation Chambers
Employ a detonation chamber capability within [assignment].

## SC-45 System Time Synchronization
Synchronize system clocks within and between systems and system components.

## SC-45(1) Synchronization with Authoritative Time Source
Compare the internal system clocks [assignment] with [assignment] ; and Synchronize the internal system clocks to the authoritative time source when the time difference is greater than [assignment].

## SC-45(2) Secondary Authoritative Time Source
Identify a secondary authoritative time source that is in a different geographic region than the primary authoritative time source; and Synchronize the internal system clocks to the secondary authoritative time source if the primary authoritative time source is unavailable.

## SC-46 Cross Domain Policy Enforcement
Implement a policy enforcement mechanism [assignment] between the physical and/or network interfaces for the connecting security domains.

## SC-47 Alternate Communications Paths
Establish [assignment] for system operations organizational command and control.

## SC-48 Sensor Relocation
Relocate [assignment] to [assignment] under the following conditions or circumstances: [assignment].

## SC-48(1) Dynamic Relocation of Sensors or Monitoring Capabilities
Dynamically relocate [assignment] to [assignment] under the following conditions or circumstances: [assignment].

## SC-49 Hardware-enforced Separation and Policy Enforcement
Implement hardware-enforced separation and policy enforcement mechanisms between [assignment].

## SC-50 Software-enforced Separation and Policy Enforcement
Implement software-enforced separation and policy enforcement mechanisms between [assignment].

## SC-51 Hardware-based Protection
Employ hardware-based, write-protect for [assignment] ; and Implement specific procedures for [assignment] to manually disable hardware write-protect for firmware modifications and re-enable the write-protect prior to returning to operational mode.
