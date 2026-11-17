console.log("Health Vault Loaded");

const uploadBtn = document.getElementById("uploadBtn");
const reportUpload = document.getElementById("reportUpload");
const reportContainer = document.getElementById("reportContainer");

let reports =
JSON.parse(localStorage.getItem("reports")) || [];

// OPEN FILE PICKER
uploadBtn.addEventListener("click", () => {
    reportUpload.click();
});

// UPLOAD FILE
reportUpload.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {

        const report = {
            name: file.name,
            type: file.type,
            data: event.target.result
        };

        reports.push(report);

        localStorage.setItem(
            "reports",
            JSON.stringify(reports)
        );

        renderReports();
    };

    reader.readAsDataURL(file);
});

// RENDER REPORTS
function renderReports() {

    reportContainer.innerHTML = "";

    reports.forEach((report, index) => {

        let preview = "";

        if (report.type.startsWith("image")) {

            preview = `
            <img src="${report.data}">
            `;

        } else {

            preview = `
            <p>📄 PDF Report</p>
            `;
        }

        reportContainer.innerHTML += `
        <div class="report-card">

            ${preview}

            <h4>${report.name}</h4>

            <a
            href="${report.data}"
            target="_blank"
            >
            Open
            </a>

            <button
            class="delete-btn"
            onclick="deleteReport(${index})"
            >
            Delete
            </button>

        </div>
        `;
    });
}

// DELETE REPORT
function deleteReport(index) {

    reports.splice(index, 1);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    renderReports();
}

// LOAD ON PAGE OPEN
renderReports();