import React, { useState } from "react";
import { Form, Input, Select, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons"; // Icon for the dropdown
import "./Dashboard.css";

const LockerDashboard = () => {
    // Generate Sample Data
    const generateData = () => {
        const sampleData = [];
        for (let i = 1; i <= 50; i++) {
            sampleData.push({
                id: i,
                open: `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(
                    Math.floor(Math.random() * 60)
                ).padStart(2, "0")} | ${String(Math.floor(Math.random() * 28 + 1)).padStart(
                    2,
                    "0"
                )}/02/24`,
                lock: i % 3 === 0 ? "---" : `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(
                    Math.floor(Math.random() * 60)
                ).padStart(2, "0")} | ${String(Math.floor(Math.random() * 28 + 1)).padStart(2, "0")}/03/24`,
                status: i % 2 === 0 ? "Locked" : "Opened",
                owner: `User ${i}`,
                location: `C${i % 5 + 1}`,
            });
        }
        return sampleData;
    };

    const sampleData = generateData();

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = Math.ceil(sampleData.length / rowsPerPage);

    // Get Current Page Data
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return sampleData.slice(startIndex, endIndex);
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    // User info for the header
    const user = {
        name: "John Doe",
        avatar: "https://www.w3schools.com/w3images/avatar2.png", // Replace with actual user avatar URL
    };

    // Dropdown Menu for Profile and Sign Out
    const menu = (
        <Menu>
            <Menu.Item key="profile">
                <a href="#">Profile</a>
            </Menu.Item>
            <Menu.Item key="signout">
                <a href="#">Sign Out</a>
            </Menu.Item>
        </Menu>
    );

    // State for button and status interaction
    const [buttonState, setButtonState] = useState({});
    const [data, setData] = useState(sampleData);

    const handleButtonClick = (id, action) => {
        const updatedData = [...data]; // Clone the data state
        const rowIndex = updatedData.findIndex((row) => row.id === id);
    
        if (rowIndex === -1) {
            console.error(`Row with ID ${id} not found.`);
            return;
        }
    
        // Get the current timestamp
        const currentTime = new Date().toLocaleString();
    
        // Update the status and timestamp based on the action
        switch (action) {
            case "lock":
                updatedData[rowIndex].status = "Locked";
                break;
            case "unlock":
                updatedData[rowIndex].status = "Opened";
                break;
            case "release":
                updatedData[rowIndex].status = "Released";
                break;
            default:
                console.error(`Invalid action: ${action}`);
                return;
        }
    
        updatedData[rowIndex].timestamp = currentTime;
    
        // Update the button state and data
        setButtonState((prevState) => ({
            ...prevState,
            [id]: action,
        }));
        setData(updatedData);
    };
    

    //action button
    const ActionButton = ({ id, action, currentState, onClick, color, label }) => (
        <button
            onClick={() => onClick(id, action)}
            aria-label={label}
            className={`${
                currentState === action ? `font-bold text-${color}-600` : "text-gray-600"
            } bg-${color}-200 px-2 py-1 rounded hover:bg-${color}-300 hover:text-white`}
        >
            {label}
        </button>
    );
    
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <div className="flex h-screen bg-gray">
            {/* Sidebar */}
            <aside className="w-1/5 bg-white-100 p-4 min-h-screen">
                <h5 className="font-bold text-lg mb-6">myVNG Dashboard</h5>
                <ul className="space-y-3">
                    <li className="font-medium text-gray-700">
                        <a href="#" className="hover:text-blue-600">
                            Work
                        </a>
                    </li>
                    <li className="font-medium text-gray-700">
                        <a href="#" className="hover:text-blue-600">
                            Form Portal
                        </a>
                        <ul className="pl-4 space-y-2 text-gray-500">
                            <li>
                                <a href="#" className="hover:text-blue-600">Forms</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">Group</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">Provider</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600">Quick Action</a>
                            </li>
                        </ul>
                    </li>
                    {/* Other menu items */}
                </ul>
            </aside>

            {/* Main Content */}
            <div className="w-4/5 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white-600 text-black px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Locker Management</h1>
                        <div className="flex items-center space-x-3">
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-semibold">{user.name}</span>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Finding Section */}
                <div className="flex space-x-4 mb-6 findingSection">
                    <Form layout="vertical" className="flex-grow">
                        <Form.Item label="Status" name="status">
                            <Select placeholder="Select Status" className="w-full">
                                <Select.Option value="all">All</Select.Option>
                                <Select.Option value="lock">Lock</Select.Option>
                                <Select.Option value="unlock">Open</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <Form layout="vertical" className="flex-grow">
                        <Form.Item label="Owner" name="owner">
                            <Input placeholder="Owner" className="w-full" />
                        </Form.Item>
                    </Form>
                    <Form layout="vertical" className="flex-grow">
                        <Form.Item label="Location" name="location">
                            <Input placeholder="Location" className="w-full" />
                        </Form.Item>
                        </Form>
                    </div>

                {/* Table Section */}
                <table className="w-full text-left border-collapse">
    <thead>
        <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {data.map((row) => (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                    <span
                        className={`px-2 py-1 rounded text-white ${
                            row.status === "Locked"
                                ? "bg-red-500"
                                : row.status === "Opened"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                    >
                        {row.status}
                    </span>
                </td>
                <td>{row.timestamp || "Not Updated"}</td> {/* Display timestamp */}
                <td>
                    <button
                        onClick={() => handleButtonClick(row.id, "lock")}
                        className={`${
                            buttonState[row.id] === "lock" ? "font-bold text-red-600" : "text-gray-600"
                        } bg-red-200 px-2 py-1 rounded hover:bg-red-300`}
                    >
                        Lock
                    </button>
                    <button
                        onClick={() => handleButtonClick(row.id, "unlock")}
                        className={`${
                            buttonState[row.id] === "unlock" ? "font-bold text-cyan-600" : "text-gray-600"
                        } bg-green-200 px-2 py-1 rounded hover:bg-green-300`}
                    >
                        Open
                    </button>
                    <button
                        onClick={() => handleButtonClick(row.id, "release")}
                        className={`${
                            buttonState[row.id] === "release" ? "font-bold text-blue-600" : "text-gray-600"
                        } bg-gray-200 px-2 py-1 rounded hover:bg-gray-300`}
                    >
                        Release
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

                <div className="table-section bg-gray p-4 shadow rounded-md">
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Date Open</th>
                                <th className="border border-gray-300 px-4 py-2">Date Lock</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Owner</th>
                                <th className="border border-gray-300 px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-4 py-2">Setting</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {getCurrentPageData().map((row) => (
                                <tr
                                    key={row.id}
                                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                                >
                                    <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.open}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.lock}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                            <span
                                className={`px-2 py-1 rounded text-white ${
                                    row.status === "Locked"
                                    ? "bg-red-500"
                                    : row.status === "Opened"
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }`}
                            >
                                {row.status}
                            </span>
                        </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.owner}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.location}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-around">
                                        <button
                                            onClick={() => handleButtonClick(row.id, "lock")}
                                            className={`bg-red-200 px-2 py-1 rounded hover:bg-red-300 ${
                                                row.status === "Locked" ? "font-bold text-red-600" : "text-gray-600"
                                            }`}
                                        >
                                        Lock
                                            </button>
                                            <button
                                            onClick={() => handleButtonClick(row.id, "unlock")}
                                            className={`bg-green-200 px-2 py-1 rounded hover:bg-green-300 ${
                                                row.status === "Opened" ? "font-bold text-green-600" : "text-gray-600"
                                            }`}
                                            >
                                        Open
                                            </button>
                                            <button
                                            onClick={() => handleButtonClick(row.id, "release")}
                                            className={`bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 ${
                                                row.status === "Released" ? "font-bold text-blue-600" : "text-gray-600"
                                            }`}
                                            >
                                            Release
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2 mb-10">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageSelect(page)}
                                className={`px-4 py-2 rounded ${currentPage === page
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LockerDashboard;
