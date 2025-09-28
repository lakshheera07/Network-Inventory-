

# NetStore

Netstore - A network inventory management application. Netstore uses SNMP protocol to discover the network devices and store it in the tree structure format. 
## Prerequisites

Before you begin, ensure you have the following installed on your system:

  * **Node.js and npm:** [Download & Install Node.js](https://nodejs.org/)
  * **MongoDB:** A running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.
  * **SNMP-enabled devices:** Access to network devices with SNMP enabled for discovery.

-----

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### 1\. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2\. Backend Setup

1.  **Navigate to the backend folder and install dependencies:**

    ```bash
    cd backend
    npm install
    ```

2.  **Create an Environment File:**
    Create a `.env` file in the `backend` directory. Copy the contents of `.env.example` (if you have one) or add the following variables, replacing the placeholder values with your actual configuration:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_strong_jwt_secret
    JWT_ACCESS_SECRET=your_super_strong_jwt_access_secret
    ```

3.  **Create Default Admin User:**
    Run the following script from the `backend` directory to create a default administrator account in your database:

    ```bash
    node utils/createDefaultAdmin.js
    ```

### 3\. Frontend Setup

1.  **Navigate to the frontend folder and install dependencies:**
    From the root directory of the project:
    ```bash
    cd frontend
    npm install
    ```
    *Note: If you are already in the `backend` folder, use `cd ../frontend`.*

-----

## ⚙️ Network Configuration

For the device discovery feature to work, you must configure your network and the application correctly.

1.  **Enable SNMP Protocol:**
    Ensure that the SNMP protocol is enabled on all target devices you wish to monitor, as well as their neighboring devices.

2.  **Set Network Range:**
    Open the `scanner.mjs` file. Find the variable holding the network's CIDR and update it to match the network range your SNMP-enabled devices are connected to.

    For example, in `scanner.mjs`:

    ```javascript
    // Update this value to your network's CIDR
    const networkCIDR = '192.168.1.0/24';
    ```

-----

## ▶️ Running the Application

You will need **two separate terminal windows** to run both the backend server and the frontend development server simultaneously.

1.  **Run the Backend Server:**

      * In your first terminal, navigate to the `backend` directory.
      * Start the server:
        ```bash
        node server.js
        ```
      * The backend API will be running on the port specified in your `.env` file (e.g., `http://localhost:5000`).

2.  **Run the Frontend Application:**

      * In your second terminal, navigate to the `frontend` directory.
      * Start the development server:
        ```bash
        npm run dev
        ```
      * Open your web browser and navigate to the URL provided in the terminal (usually `http://localhost:3000`).
