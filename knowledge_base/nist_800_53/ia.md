# NIST SP 800-53 Rev 5 — Identification and Authentication (IA)

_Source: NIST SP 800-53 Rev 5 control catalog (public domain). Each heading is a real control ID for citation._

## IA-1 Policy and Procedures
Develop, document, and disseminate to [assignment]: [assignment] identification and authentication policy that: Addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance; and Is consistent with applicable laws, executive orders, directives, regulations, policies, standards, and guidelines; and Procedures to facilitate the implementation of the identification and authentication policy and the associated identification and authentication controls; Designate an [assignment] to manage the development, documentation, and dissemination of the identification and authentication policy and procedures; and Review and update the current identification and authentication: Policy [assignment] and following [assignment] ; and Procedures [assignment] and following [assignment].

## IA-2 Identification and Authentication (Organizational Users)
Uniquely identify and authenticate organizational users and associate that unique identification with processes acting on behalf of those users.

## IA-2(1) Multi-factor Authentication to Privileged Accounts
Implement multi-factor authentication for access to privileged accounts.

## IA-2(2) Multi-factor Authentication to Non-privileged Accounts
Implement multi-factor authentication for access to non-privileged accounts.

## IA-2(5) Individual Authentication with Group Authentication
When shared accounts or authenticators are employed, require users to be individually authenticated before granting access to the shared accounts or resources.

## IA-2(6) Access to Accounts —separate Device
Implement multi-factor authentication for [assignment] access to [assignment] such that: One of the factors is provided by a device separate from the system gaining access; and The device meets [assignment].

## IA-2(8) Access to Accounts — Replay Resistant
Implement replay-resistant authentication mechanisms for access to [assignment].

## IA-2(10) Single Sign-on
Provide a single sign-on capability for [assignment].

## IA-2(12) Acceptance of PIV Credentials
Accept and electronically verify Personal Identity Verification-compliant credentials.

## IA-2(13) Out-of-band Authentication
Implement the following out-of-band authentication mechanisms under [assignment]: [assignment].

## IA-3 Device Identification and Authentication
Uniquely identify and authenticate [assignment] before establishing a [assignment] connection.

## IA-3(1) Cryptographic Bidirectional Authentication
Authenticate [assignment] before establishing [assignment] connection using bidirectional authentication that is cryptographically based.

## IA-3(3) Dynamic Address Allocation
Where addresses are allocated dynamically, standardize dynamic address allocation lease information and the lease duration assigned to devices in accordance with [assignment] ; and Audit lease information when assigned to a device.

## IA-3(4) Device Attestation
Handle device identification and authentication based on attestation by [assignment].

## IA-4 Identifier Management
Manage system identifiers by: Receiving authorization from [assignment] to assign an individual, group, role, service, or device identifier; Selecting an identifier that identifies an individual, group, role, service, or device; Assigning the identifier to the intended individual, group, role, service, or device; and Preventing reuse of identifiers for [assignment].

## IA-4(1) Prohibit Account Identifiers as Public Identifiers
Prohibit the use of system account identifiers that are the same as public identifiers for individual accounts.

## IA-4(4) Identify User Status
Manage individual identifiers by uniquely identifying each individual as [assignment].

## IA-4(5) Dynamic Management
Manage individual identifiers dynamically in accordance with [assignment].

## IA-4(6) Cross-organization Management
Coordinate with the following external organizations for cross-organization management of identifiers: [assignment].

## IA-4(8) Pairwise Pseudonymous Identifiers
Generate pairwise pseudonymous identifiers.

## IA-4(9) Attribute Maintenance and Protection
Maintain the attributes for each uniquely identified individual, device, or service in [assignment].

## IA-5 Authenticator Management
Manage system authenticators by: Verifying, as part of the initial authenticator distribution, the identity of the individual, group, role, service, or device receiving the authenticator; Establishing initial authenticator content for any authenticators issued by the organization; Ensuring that authenticators have sufficient strength of mechanism for their intended use; Establishing and implementing administrative procedures for initial authenticator distribution, for lost or compromised or damaged authenticators, and for revoking authenticators; Changing default authenticators prior to first use; Changing or refreshing authenticators [assignment] or when [assignment] occur; Protecting authenticator content from unauthorized disclosure and modification; Requiring individuals to take, and having devices implement, specific controls to protect authenticators; and Changing authenticators for group or role accounts when membership to those accounts changes.

## IA-5(1) Password-based Authentication
For password-based authentication: Maintain a list of commonly-used, expected, or compromised passwords and update the list [assignment] and when organizational passwords are suspected to have been compromised directly or indirectly; Verify, when users create or update passwords, that the passwords are not found on the list of commonly-used, expected, or compromised passwords in IA-5(1)(a); Transmit passwords only over cryptographically-protected channels; Store passwords using an approved salted key derivation function, preferably using a keyed hash; Require immediate selection of a new password upon account recovery; Allow user selection of long passwords and passphrases, including spaces and all printable characters; Employ automated tools to assist the user in selecting strong password authenticators; and Enforce the following composition and complexity rules: [assignment].

## IA-5(2) Public Key-based Authentication
For public key-based authentication: Enforce authorized access to the corresponding private key; and Map the authenticated identity to the account of the individual or group; and When public key infrastructure (PKI) is used: Validate certificates by constructing and verifying a certification path to an accepted trust anchor, including checking certificate status information; and Implement a local cache of revocation data to support path discovery and validation.

## IA-5(5) Change Authenticators Prior to Delivery
Require developers and installers of system components to provide unique authenticators or change default authenticators prior to delivery and installation.

## IA-5(6) Protection of Authenticators
Protect authenticators commensurate with the security category of the information to which use of the authenticator permits access.

## IA-5(7) No Embedded Unencrypted Static Authenticators
Ensure that unencrypted static authenticators are not embedded in applications or other forms of static storage.

## IA-5(8) Multiple System Accounts
Implement [assignment] to manage the risk of compromise due to individuals having accounts on multiple systems.

## IA-5(9) Federated Credential Management
Use the following external organizations to federate credentials: [assignment].

## IA-5(10) Dynamic Credential Binding
Bind identities and authenticators dynamically using the following rules: [assignment].

## IA-5(12) Biometric Authentication Performance
For biometric-based authentication, employ mechanisms that satisfy the following biometric quality requirements [assignment].

## IA-5(13) Expiration of Cached Authenticators
Prohibit the use of cached authenticators after [assignment].

## IA-5(14) Managing Content of PKI Trust Stores
For PKI-based authentication, employ an organization-wide methodology for managing the content of PKI trust stores installed across all platforms, including networks, operating systems, browsers, and applications.

## IA-5(15) GSA-approved Products and Services
Use only General Services Administration-approved products and services for identity, credential, and access management.

## IA-5(16) In-person or Trusted External Party Authenticator Issuance
Require that the issuance of [assignment] be conducted [assignment] before [assignment] with authorization by [assignment].

## IA-5(17) Presentation Attack Detection for Biometric Authenticators
Employ presentation attack detection mechanisms for biometric-based authentication.

## IA-5(18) Password Managers
Employ [assignment] to generate and manage passwords; and Protect the passwords using [assignment].

## IA-6 Authentication Feedback
Obscure feedback of authentication information during the authentication process to protect the information from possible exploitation and use by unauthorized individuals.

## IA-7 Cryptographic Module Authentication
Implement mechanisms for authentication to a cryptographic module that meet the requirements of applicable laws, executive orders, directives, policies, regulations, standards, and guidelines for such authentication.

## IA-8 Identification and Authentication (Non-organizational Users)
Uniquely identify and authenticate non-organizational users or processes acting on behalf of non-organizational users.

## IA-8(1) Acceptance of PIV Credentials from Other Agencies
Accept and electronically verify Personal Identity Verification-compliant credentials from other federal agencies.

## IA-8(2) Acceptance of External Authenticators
Accept only external authenticators that are NIST-compliant; and Document and maintain a list of accepted external authenticators.

## IA-8(4) Use of Defined Profiles
Conform to the following profiles for identity management [assignment].

## IA-8(5) Acceptance of PIV-I Credentials
Accept and verify federated or PKI credentials that meet [assignment].

## IA-8(6) Disassociability
Implement the following measures to disassociate user attributes or identifier assertion relationships among individuals, credential service providers, and relying parties: [assignment].

## IA-9 Service Identification and Authentication
Uniquely identify and authenticate [assignment] before establishing communications with devices, users, or other services or applications.

## IA-10 Adaptive Authentication
Require individuals accessing the system to employ [assignment] under specific [assignment].

## IA-11 Re-authentication
Require users to re-authenticate when [assignment].

## IA-12 Identity Proofing
Identity proof users that require accounts for logical access to systems based on appropriate identity assurance level requirements as specified in applicable standards and guidelines; Resolve user identities to a unique individual; and Collect, validate, and verify identity evidence.

## IA-12(1) Supervisor Authorization
Require that the registration process to receive an account for logical access includes supervisor or sponsor authorization.

## IA-12(2) Identity Evidence
Require evidence of individual identification be presented to the registration authority.

## IA-12(3) Identity Evidence Validation and Verification
Require that the presented identity evidence be validated and verified through [assignment].

## IA-12(4) In-person Validation and Verification
Require that the validation and verification of identity evidence be conducted in person before a designated registration authority.

## IA-12(5) Address Confirmation
Require that a [assignment] be delivered through an out-of-band channel to verify the users address (physical or digital) of record.

## IA-12(6) Accept Externally-proofed Identities
Accept externally-proofed identities at [assignment].

## IA-13 Identity Providers and Authorization Servers
Employ identity providers and authorization servers to manage user, device, and non-person entity (NPE) identities, attributes, and access rights supporting authentication and authorization decisions in accordance with [assignment] using [assignment].

## IA-13(1) Protection of Cryptographic Keys
Cryptographic keys that protect access tokens are generated, managed, and protected from disclosure and misuse.

## IA-13(2) Verification of Identity Assertions and Access Tokens
The source and integrity of identity assertions and access tokens are verified before granting access to system and information resources.

## IA-13(3) Token Management
In accordance with [assignment], assertions and access tokens are: generated; issued; refreshed; revoked; time-restricted; and audience-restricted.
