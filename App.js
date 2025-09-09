// Smart Attendance App - Core JavaScript
// This file manages all application logic, data storage, and interactions

// Initialize localStorage data if not exists
function initializeData() {
    // Check if data exists
    if (!localStorage.getItem('users')) {
        // Create default users
        const users = [
            {
                id: 1,
                username: 'teacher1',
                password: 'password123',
                role: 'teacher',
                name: 'Prof. Smith',
                email: 'teacher@example.com'
            },
            {
                id: 2,
                username: 'student1',
                password: 'password123',
                role: 'student',
                name: 'John Doe',
                email: 'john@example.com',
                interests: ['programming', 'mathematics', 'AI'],
                goals: ['software engineer', 'data scientist']
            },
            {
                id: 3,
                username: 'student2',
                password: 'password123',
                role: 'student',
                name: 'Jane Smith',
                email: 'jane@example.com',
                interests: ['design', 'business', 'marketing'],
                goals: ['entrepreneur', 'product manager']
            },
            {
                id: 4,
                username: 'student3',
                password: 'password123',
                role: 'student',
                name: 'Mike Johnson',
                email: 'mike@example.com',
                interests: ['data science', 'analytics', 'AI'],
                goals: ['data analyst', 'ML engineer']
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (!localStorage.getItem('classes')) {
        const classes = [
            {
                id: 1,
                name: 'Computer Science 101',
                teacherId: 1,
                schedule: {
                    Monday: '10:00-11:00',
                    Wednesday: '10:00-11:00',
                    Friday: '10:00-11:00'
                }
            },
            {
                id: 2,
                name: 'Data Structures',
                teacherId: 1,
                schedule: {
                    Tuesday: '14:00-15:00',
                    Thursday: '14:00-15:00'
                }
            },
            {
                id: 3,
                name: 'Web Development',
                teacherId: 1,
                schedule: {
                    Monday: '14:00-15:00',
                    Wednesday: '14:00-15:00'
                }
            }
        ];
        localStorage.setItem('classes', JSON.stringify(classes));
    }

    if (!localStorage.getItem('timetables')) {
        const timetables = [
            // Student 1 timetable
            { studentId: 2, day: 'Monday', timeSlot: '10:00-11:00', classId: 1 },
            { studentId: 2, day: 'Monday', timeSlot: '14:00-15:00', classId: 3 },
            { studentId: 2, day: 'Tuesday', timeSlot: '14:00-15:00', classId: 2 },
            { studentId: 2, day: 'Wednesday', timeSlot: '10:00-11:00', classId: 1 },
            { studentId: 2, day: 'Wednesday', timeSlot: '14:00-15:00', classId: 3 },
            { studentId: 2, day: 'Thursday', timeSlot: '14:00-15:00', classId: 2 },
            { studentId: 2, day: 'Friday', timeSlot: '10:00-11:00', classId: 1 },
            // Student 2 timetable
            { studentId: 3, day: 'Monday', timeSlot: '10:00-11:00', classId: 1 },
            { studentId: 3, day: 'Tuesday', timeSlot: '14:00-15:00', classId: 2 },
            { studentId: 3, day: 'Wednesday', timeSlot: '10:00-11:00', classId: 1 },
            { studentId: 3, day: 'Friday', timeSlot: '10:00-11:00', classId: 1 }
        ];
        localStorage.setItem('timetables', JSON.stringify(timetables));
    }

    if (!localStorage.getItem('activities')) {
        const activities = [
            {
                id: 1,
                title: 'Python Programming Practice',
                description: 'Solve coding problems to improve your Python skills',
                category: 'academic',
                duration: 30,
                tags: ['programming', 'python', 'coding']
            },
            {
                id: 2,
                title: 'Machine Learning Tutorial',
                description: 'Watch and follow along with ML tutorials',
                category: 'academic',
                duration: 45,
                tags: ['AI', 'machine learning', 'data science']
            },
            {
                id: 3,
                title: 'Resume Building Workshop',
                description: 'Update and improve your resume for better opportunities',
                category: 'career',
                duration: 30,
                tags: ['career', 'job', 'resume']
            },
            {
                id: 4,
                title: 'Design Thinking Exercise',
                description: 'Practice design thinking methodologies',
                category: 'skill',
                duration: 20,
                tags: ['design', 'creativity', 'problem solving']
            },
            {
                id: 5,
                title: 'Business Case Study',
                description: 'Analyze a real-world business case',
                category: 'academic',
                duration: 40,
                tags: ['business', 'strategy', 'marketing']
            },
            {
                id: 6,
                title: 'Data Analysis with Excel',
                description: 'Learn advanced Excel functions for data analysis',
                category: 'skill',
                duration: 35,
                tags: ['data science', 'analytics', 'excel']
            },
            {
                id: 7,
                title: 'Public Speaking Practice',
                description: 'Improve your presentation and communication skills',
                category: 'skill',
                duration: 25,
                tags: ['communication', 'presentation', 'soft skills']
            },
            {
                id: 8,
                title: 'Algorithm Challenge',
                description: 'Solve algorithmic problems to enhance problem-solving',
                category: 'academic',
                duration: 50,
                tags: ['programming', 'algorithms', 'mathematics']
            }
        ];
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    if (!localStorage.getItem('attendance')) {
        localStorage.setItem('attendance', JSON.stringify([]));
    }

    if (!localStorage.getItem('qrCodes')) {
        localStorage.setItem('qrCodes', JSON.stringify([]));
    }
}

// Authentication functions
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

// QR Code functions
function generateQRCode(classId) {
    const timestamp = new Date().toISOString();
    const qrData = `ATTENDANCE:${classId}:${timestamp}`;
    
    // Store QR code with expiration
    const qrCodes = JSON.parse(localStorage.getItem('qrCodes') || '[]');
    qrCodes.push({
        code: qrData,
        classId: classId,
        timestamp: timestamp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    });
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes));
    
    return qrData;
}

function validateQRCode(qrCode) {
    const qrCodes = JSON.parse(localStorage.getItem('qrCodes') || '[]');
    const qr = qrCodes.find(q => q.code === qrCode);
    
    if (!qr) {
        return { valid: false, message: 'Invalid QR code' };
    }
    
    if (new Date(qr.expiresAt) < new Date()) {
        return { valid: false, message: 'QR code has expired' };
    }
    
    return { valid: true, classId: qr.classId };
}

function markAttendance(studentId, classId) {
    const attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    
    // Check if already marked today
    const today = new Date().toDateString();
    const alreadyMarked = attendance.find(a => 
        a.studentId === studentId && 
        a.classId === classId && 
        new Date(a.timestamp).toDateString() === today
    );
    
    if (alreadyMarked) {
        return { success: false, message: 'Attendance already marked for this class today' };
    }
    
    attendance.push({
        id: Date.now(),
        studentId: studentId,
        classId: classId,
        timestamp: new Date().toISOString(),
        status: 'present'
    });
    
    localStorage.setItem('attendance', JSON.stringify(attendance));
    return { success: true, message: 'Attendance marked successfully!' };
}

// Get student's attendance records
function getStudentAttendance(studentId) {
    const attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    
    return attendance
        .filter(a => a.studentId === studentId)
        .map(a => {
            const cls = classes.find(c => c.id === a.classId);
            return {
                ...a,
                className: cls ? cls.name : 'Unknown Class'
            };
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Get today's schedule for a student
function getTodaySchedule(studentId) {
    const timetables = JSON.parse(localStorage.getItem('timetables') || '[]');
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    return timetables
        .filter(t => t.studentId === studentId && t.day === today)
        .map(t => {
            const cls = classes.find(c => c.id === t.classId);
            return {
                ...t,
                className: cls ? cls.name : 'Unknown Class'
            };
        })
        .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
}

// Get suggested activities for a student
function getSuggestedActivities(studentId) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const user = users.find(u => u.id === studentId);
    
    if (!user || !user.interests) {
        // Return random activities if no interests
        return activities.slice(0, 5);
    }
    
    // Score activities based on matching interests
    const scoredActivities = activities.map(activity => {
        let score = 0;
        if (activity.tags) {
            activity.tags.forEach(tag => {
                user.interests.forEach(interest => {
                    if (tag.toLowerCase().includes(interest.toLowerCase()) || 
                        interest.toLowerCase().includes(tag.toLowerCase())) {
                        score += 2;
                    }
                });
            });
        }
        return { ...activity, score };
    });
    
    // Sort by score and return top 5
    return scoredActivities
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

// Get teacher's classes
function getTeacherClasses(teacherId) {
    const classes = JSON.parse(localStorage.getItem('classes') || '[]');
    return classes.filter(c => c.teacherId === teacherId);
}

// Get class attendance statistics
function getClassStats(classId) {
    const attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    const timetables = JSON.parse(localStorage.getItem('timetables') || '[]');
    
    const classAttendance = attendance.filter(a => a.classId === classId);
    const enrolledStudents = [...new Set(timetables.filter(t => t.classId === classId).map(t => t.studentId))];
    
    return {
        totalSessions: classAttendance.length,
        enrolledStudents: enrolledStudents.length,
        averageAttendance: classAttendance.length > 0 ? 
            (classAttendance.length / (enrolledStudents.length || 1)).toFixed(1) : 0
    };
}

// Format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Check authentication on protected pages
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update navigation with user info
function updateNavigation() {
    const user = getCurrentUser();
    const userInfoElement = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    
    if (user && userInfoElement) {
        userInfoElement.innerHTML = `
            <span class="user-info">Welcome, ${user.name}!</span>
            <a href="${user.role}-dashboard.html" class="nav-link">Dashboard</a>
            <button onclick="logout()" class="btn btn-outline">Logout</button>
        `;
    }
}

// Generate visual QR code (simple ASCII representation)
function generateQRVisual(data) {
    // This creates a simple visual representation
    // In a real app, you'd use a QR library
    const size = 15;
    let qr = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Create a pattern based on the data
            const char = (data.charCodeAt((i * size + j) % data.length) + i + j) % 2 === 0 ? '█' : '░';
            qr += char + char;
        }
        qr += '\n';
    }
    return qr;
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateNavigation();
});

// Export functions for use in HTML pages
window.app = {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    checkAuth,
    generateQRCode,
    validateQRCode,
    markAttendance,
    getStudentAttendance,
    getTodaySchedule,
    getSuggestedActivities,
    getTeacherClasses,
    getClassStats,
    formatDateTime,
    generateQRVisual,
    updateNavigation
};
