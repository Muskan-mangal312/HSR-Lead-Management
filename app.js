// Example leads data
let leads = [
    { id: 1, name: 'Aaron Sharma', status: 'New' },
    { id: 2, name: 'Tanushka garg', status: 'Contacted' },
];

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';

    if (screenId === 'lead-listing') {
        populateLeadList();
    } else if (screenId === 'dashboard') {
        populateDashboard();
    }
}

function populateLeadList() {
    const leadList = document.getElementById('lead-list');
    leadList.innerHTML = '';

    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.id}</td>
            <td>${lead.name}</td>
            <td>${lead.status}</td>
            <td><button onclick="viewLeadDetails(${lead.id})">View</button></td>
        `;
        leadList.appendChild(row);
    });
}

function viewLeadDetails(leadId) {
    const lead = leads.find(l => l.id === leadId);
    const details = document.getElementById('lead-details-content');
    details.innerHTML = `
        <p><strong>ID:</strong> ${lead.id}</p>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Status:</strong> ${lead.status}</p>
    `;

    showScreen('lead-details');
}

function populateDashboard() {
    const dashboard = document.getElementById('dashboard-content');
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
    const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
    const notInterestedLeads = leads.filter(l => l.status === 'Not Interested').length;

    dashboard.innerHTML = `
        <p>Total Leads: ${totalLeads}</p>
        <p>New Leads: ${newLeads}</p>
        <p>Contacted Leads: ${contactedLeads}</p>
        <p>Qualified Leads: ${qualifiedLeads}</p>
        <p>Not Interested Leads: ${notInterestedLeads}</p>
    `;
}

document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('lead-name').value;
    const status = document.getElementById('lead-status').value;

    const newLead = {
        id: leads.length + 1,
        name,
        status,
    };

    leads.push(newLead);
    document.getElementById('lead-form').reset();
    showScreen('lead-listing');
    populateLeadList();
});

showScreen('lead-listing');
