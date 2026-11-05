// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = "http://localhost:5001";


// ==========================================
// GLOBAL DATA
// ==========================================

let membersData = [];
let plansData = [];
let trainersData = [];
let enrollmentsData = [];


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showSection(sectionId, button = null) {

    // Hide all sections
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });


    // Show selected section
    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }


    // Update navigation buttons
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.classList.remove("active");
    });


    if (button) {
        button.classList.add("active");
    }


    // Update page title
    const titles = {
        dashboard: "Dashboard",
        members: "Members",
        plans: "Membership Plans",
        trainers: "Trainers",
        enrollments: "Enrollments"
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionId] || "Dashboard";
}


// ==========================================
// LOAD DASHBOARD DATA
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(`${API_URL}/api/members`);

        if (!response.ok) {
            throw new Error("Unable to fetch members");
        }

        membersData = await response.json();

        updateMemberStatistics();
        displayRecentMembers();
        displayMembers();

    } catch (error) {

        console.error("Dashboard error:", error);

        showErrorMessage(
            "Unable to connect to the backend server."
        );
    }
}


// ==========================================
// LOAD MEMBERS
// ==========================================

async function loadMembers() {

    try {

        const response = await fetch(`${API_URL}/api/members`);

        if (!response.ok) {
            throw new Error("Unable to fetch members");
        }

        membersData = await response.json();

        updateMemberStatistics();

        displayRecentMembers();

        displayMembers();

    } catch (error) {

        console.error("Members error:", error);
    }
}


// ==========================================
// LOAD PLANS
// ==========================================

async function loadPlans() {

    try {

        const response = await fetch(`${API_URL}/api/plans`);

        if (!response.ok) {
            throw new Error("Unable to fetch plans");
        }

        plansData = await response.json();

        document.getElementById("totalPlans").textContent =
            plansData.length;

        displayPlans();

    } catch (error) {

        console.error("Plans error:", error);

        document.getElementById("totalPlans").textContent = "0";
    }
}


// ==========================================
// LOAD TRAINERS
// ==========================================

async function loadTrainers() {

    try {

        const response = await fetch(`${API_URL}/api/trainers`);

        if (!response.ok) {
            throw new Error("Unable to fetch trainers");
        }

        trainersData = await response.json();

        document.getElementById("totalTrainers").textContent =
            trainersData.length;

        displayTrainers();

    } catch (error) {

        console.error("Trainers error:", error);
    }
}


// ==========================================
// LOAD ENROLLMENTS
// ==========================================

async function loadEnrollments() {

    try {

        const response =
            await fetch(`${API_URL}/api/enrollments`);

        if (!response.ok) {
            throw new Error("Unable to fetch enrollments");
        }

        enrollmentsData = await response.json();

        displayEnrollments();

    } catch (error) {

        console.error("Enrollments error:", error);
    }
}


// ==========================================
// MEMBER STATISTICS
// ==========================================

function updateMemberStatistics() {

    const total = membersData.length;

    const active = membersData.filter(member =>
        member.status &&
        member.status.toLowerCase() === "active"
    ).length;


    document.getElementById("totalMembers").textContent =
        total;

    document.getElementById("activeMembers").textContent =
        active;
}


// ==========================================
// DISPLAY RECENT MEMBERS
// ==========================================

function displayRecentMembers() {

    const table =
        document.getElementById("recentMembers");

    table.innerHTML = "";


    const recentMembers =
        membersData.slice(0, 5);


    if (recentMembers.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No members found.
                </td>
            </tr>
        `;

        return;
    }


    recentMembers.forEach(member => {

        const statusClass =
            member.status?.toLowerCase() === "active"
                ? "status-active"
                : "status-inactive";


        table.innerHTML += `

            <tr>

                <td>#${member.member_id}</td>

                <td>
                    <strong>${member.name}</strong>
                </td>

                <td>${member.email}</td>

                <td>${member.phone}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${member.status}
                    </span>
                </td>

            </tr>

        `;
    });
}


// ==========================================
// DISPLAY ALL MEMBERS
// ==========================================

function displayMembers(data = membersData) {

    const table =
        document.getElementById("membersTable");

    table.innerHTML = "";


    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    No members found.
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(member => {

        const statusClass =
            member.status?.toLowerCase() === "active"
                ? "status-active"
                : "status-inactive";


        table.innerHTML += `

            <tr>

                <td>#${member.member_id}</td>

                <td>
                    <strong>${member.name}</strong>
                </td>

                <td>${member.email}</td>

                <td>${member.phone}</td>

                <td>${formatDate(member.join_date)}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${member.status}
                    </span>
                </td>

            </tr>

        `;
    });
}


// ==========================================
// SEARCH MEMBERS
// ==========================================

function searchMembers() {

    const search =
        document.getElementById("memberSearch")
            .value
            .toLowerCase();


    const filtered =
        membersData.filter(member => {

            return (
                member.name.toLowerCase().includes(search) ||
                member.email.toLowerCase().includes(search) ||
                member.phone.includes(search)
            );

        });


    displayMembers(filtered);
}


// ==========================================
// DISPLAY MEMBERSHIP PLANS
// ==========================================

function displayPlans() {

    const container =
        document.getElementById("plansGrid");

    container.innerHTML = "";


    if (plansData.length === 0) {

        container.innerHTML = `
            <div class="card">
                No membership plans found.
            </div>
        `;

        return;
    }


    plansData.forEach(plan => {

        const durationText =
            plan.duration_months === 1
                ? "1 Month"
                : `${plan.duration_months} Months`;


        container.innerHTML += `

            <div class="plan-card">

                <h3>
                    ${plan.plan_name}
                </h3>

                <div class="price">
                    ₹${Number(plan.fee).toLocaleString("en-IN")}
                </div>

                <div class="duration">
                    ${durationText}
                </div>

                <hr>

                <p>
                    ✓ Gym access included
                </p>

                <p>
                    ✓ Fitness support
                </p>

            </div>

        `;
    });
}


// ==========================================
// DISPLAY TRAINERS
// ==========================================

function displayTrainers() {

    const table =
        document.getElementById("trainersTable");

    table.innerHTML = "";


    if (trainersData.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    No trainers found.
                </td>
            </tr>
        `;

        return;
    }


    trainersData.forEach(trainer => {

        table.innerHTML += `

            <tr>

                <td>
                    #${trainer.trainer_id}
                </td>

                <td>
                    <strong>
                        ${trainer.trainer_name}
                    </strong>
                </td>

                <td>
                    ${trainer.specialization || "-"}
                </td>

                <td>
                    ${trainer.phone || "-"}
                </td>

            </tr>

        `;
    });
}


// ==========================================
// DISPLAY ENROLLMENTS
// ==========================================

function displayEnrollments() {

    const table =
        document.getElementById("enrollmentsTable");

    table.innerHTML = "";


    if (enrollmentsData.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No enrollments found.
                </td>
            </tr>
        `;

        return;
    }


    enrollmentsData.forEach(enrollment => {

        table.innerHTML += `

            <tr>

                <td>
                    #${enrollment.enrollment_id}
                </td>

                <td>
                    <strong>
                        ${enrollment.member_name}
                    </strong>
                </td>

                <td>
                    ${enrollment.plan_name}
                </td>

                <td>
                    ₹${Number(enrollment.fee)
                        .toLocaleString("en-IN")}
                </td>

                <td>
                    ${enrollment.trainer_name || "-"}
                </td>

                <td>
                    ${formatDate(enrollment.start_date)}
                </td>

                <td>
                    ${formatDate(enrollment.expiry_date)}
                </td>

            </tr>

        `;
    });
}


// ==========================================
// ADD MEMBER FORM
// ==========================================

function openMemberForm() {

    document
        .getElementById("memberModal")
        .classList.add("show");
}


function closeMemberForm() {

    document
        .getElementById("memberModal")
        .classList.remove("show");

    document
        .getElementById("memberForm")
        .reset();
}


// ==========================================
// ADD MEMBER
// ==========================================

document
    .getElementById("memberForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();


        const member = {

            name:
                document
                    .getElementById("memberName")
                    .value,

            email:
                document
                    .getElementById("memberEmail")
                    .value,

            phone:
                document
                    .getElementById("memberPhone")
                    .value,

            join_date:
                document
                    .getElementById("memberJoinDate")
                    .value,

            status: "Active"

        };


        try {

            const response =
                await fetch(`${API_URL}/api/members`, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(member)

                });


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.error ||
                    "Unable to add member"
                );

            }


            alert("Member added successfully!");

            closeMemberForm();

            await loadMembers();


        } catch (error) {

            console.error(error);

            alert(
                "Unable to add member. " +
                error.message
            );

        }

    });


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {
        return dateString;
    }


    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// ==========================================
// ERROR MESSAGE
// ==========================================

function showErrorMessage(message) {

    console.error(message);

    const recentMembers =
        document.getElementById("recentMembers");

    if (recentMembers) {

        recentMembers.innerHTML = `

            <tr>

                <td colspan="5">

                    <div style="
                        padding: 15px;
                        color: #991b1b;
                        background: #fee2e2;
                        border-radius: 8px;
                    ">

                        ${message}

                    </div>

                </td>

            </tr>

        `;
    }
}


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadDashboard();

    await loadPlans();

    await loadTrainers();

    await loadEnrollments();

});