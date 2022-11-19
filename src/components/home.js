import { Typography } from "@mui/material";

function Home() {
    return (
        <Typography variant="body1" gutterBottom>
            Identities are not passive, so should be the proof of access right. When using online services, the most existing authentication process is third-party oriented, and the verifying ID information is not fully autonomous. The key to the problem boils down to the inefficiency of current centralized authentication schemes, using excessive and unnecessary personal information to verify users’ access rights. To solve the issue, this project intends to renovate the authentication process through cryptographic means to realize user-centric identity verification with minimal information grants. As a proof-of-concept, an application with identity-based zero-knowledge proof will be developed and delivered by the end of the project.
        </Typography>

    )
}

export default Home;