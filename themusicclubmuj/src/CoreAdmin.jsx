import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Eye,
    EyeOff,
    LogOut,
    Plus,
    Trash2,
} from "lucide-react";

import {
    changeCurrentUserPassword,
    getCoreUserSettings,
    markCorePasswordChanged,
    createCalendarTask,
    deleteCalendarTask,
    loginCoreMember,
    logoutCoreMember,
    resetCorePassword,
    subscribeCalendarTasks,
    updateCalendarTask,
    watchAuth,
} from "./firebase";

import { getCoreProfile } from "./coreMembers.js";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getCalendarCells(monthDate) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const leadingEmptyCells = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const cells = [];

    for (let index = 0; index < leadingEmptyCells; index += 1) {
        cells.push(null);
    }

    for (let day = 1; day <= totalDays; day += 1) {
        cells.push(new Date(year, month, day));
    }

    return cells;
}

function getInitialTask(date) {
    return {
        date,
        title: "",
        type: "Task",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
    };
}

function CoreLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setStatus("loading");
        setMessage("");

        try {
            await loginCoreMember(email.trim().toLowerCase(), password);
            setStatus("idle");
        } catch (error) {
            console.error("Firebase login error:", error.code, error.message);
            setStatus("error");
            setMessage(error.code);
        }
    };

    const handleResetPassword = async () => {
        if (!email.trim()) {
            setMessage("Enter your email first, then click reset password.");
            return;
        }

        try {
            await resetCorePassword(email.trim().toLowerCase());
            setMessage("Password reset email sent.");
        } catch {
            setMessage("Could not send reset email. Check the email address.");
        }
    };

    return (
        <main className="core-login-page">
            <button
                type="button"
                className="core-home-button"
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                ← Home
            </button>

            <form className="core-login-card" onSubmit={handleLogin}>
                <div className="core-login-icon">
                    <img
                        src="/assets/tmc-logo.png"
                        alt="The Music Club logo"
                    />
                </div>

                <p className="eyebrow">Core Portal</p>
                <h1>The Music Club Admin</h1>
                <p>
                    Login with your core email to manage the internal event calendar.
                </p>

                <input
                    type="email"
                    placeholder="Core email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <div className="core-password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="core-password-toggle"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Logging in..." : "Login"}
                </button>

                <button
                    type="button"
                    className="core-text-button"
                    onClick={handleResetPassword}
                >
                    Set / reset your password
                </button>

                {message && <p className="core-form-message">{message}</p>}
            </form>
        </main>
    );
}
function ForcePasswordChange({ profile, onDone }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("");

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        if (newPassword.length < 8) {
            setStatus("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatus("Passwords do not match.");
            return;
        }

        try {
            setStatus("Updating password...");

            await changeCurrentUserPassword(newPassword);
            await markCorePasswordChanged(profile.email);

            setStatus("Password updated successfully.");
            onDone();
        } catch (error) {
            console.error("Password change error:", error);

            if (error.code === "auth/requires-recent-login") {
                setStatus("Please logout, login again, and immediately set your new password.");
            } else {
                setStatus("Could not update password. Try again.");
            }
        }
    };

    return (
        <main className="core-login-page">
            <button
                type="button"
                className="core-home-button"
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                ← Home
            </button>

            <form className="core-login-card" onSubmit={handlePasswordChange}>
                <div className="core-login-icon">
                    <img
                        src="/assets/tmc-logo.png"
                        alt="The Music Club logo"
                    />
                </div>

                <p className="eyebrow">First Login</p>
                <h1>Set New Password</h1>

                <p>
                    Welcome, {profile.name}. Please create your own password before
                    entering the core calendar.
                </p>

                <div className="core-password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="core-password-toggle"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />

                <button type="submit">
                    Save New Password
                </button>

                {status && <p className="core-form-message">{status}</p>}
            </form>
        </main>
    );
}

const TASK_TYPES = [
    "Task",
    "Meeting",
    "Event",
    "Rehearsal",
    "Deadline",
    "Permission Work",
];

function TaskTypeSelect({ value, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="tmc-task-type-select">
            <button
                type="button"
                className="tmc-task-type-trigger"
                onClick={() => setOpen((current) => !current)}
            >
                <span>{value || "Task"}</span>
                <ChevronRight size={18} />
            </button>

            {open && (
                <div className="tmc-task-type-menu">
                    {TASK_TYPES.map((type) => (
                        <button
                            type="button"
                            key={type}
                            className={value === type ? "active" : ""}
                            onClick={() => {
                                onChange(type);
                                setOpen(false);
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function TimePicker12Hour({
                              id,
                              label,
                              value,
                              onChange,
                              activeTimePicker,
                              setActiveTimePicker,
                          }) {
    const open = activeTimePicker === id;

    const parseTime = (timeValue) => {
        if (!timeValue) {
            return { hour: "12", minute: "00", period: "PM" };
        }

        const match = timeValue.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/);

        if (!match) {
            return { hour: "12", minute: "00", period: "PM" };
        }

        return {
            hour: match[1],
            minute: match[2],
            period: match[3],
        };
    };

    const parsed = parseTime(value);

    const [hour, setHour] = useState(parsed.hour);
    const [minute, setMinute] = useState(parsed.minute);
    const [period, setPeriod] = useState(parsed.period);

    useEffect(() => {
        const parsedNext = parseTime(value);
        setHour(parsedNext.hour);
        setMinute(parsedNext.minute);
        setPeriod(parsedNext.period);
    }, [value]);

    const applyTime = (
        nextHour = hour,
        nextMinute = minute,
        nextPeriod = period
    ) => {
        onChange(`${nextHour}:${nextMinute} ${nextPeriod}`);
    };

    const clearTime = () => {
        setHour("12");
        setMinute("00");
        setPeriod("PM");
        onChange("");
        setActiveTimePicker(null);
    };

    return (
        <div
            className="tmc-time-picker"
            onClick={(event) => event.stopPropagation()}
        >
            <button
                type="button"
                className={`tmc-time-trigger ${value ? "filled" : ""}`}
                onClick={() =>
                    setActiveTimePicker(open ? null : id)
                }
            >
                <span>{value || label}</span>
                <Clock3 size={19} />
            </button>

            {open && (
                <div className="tmc-time-popover">
                    <div className="tmc-time-popover-head">
                        <strong>{label}</strong>

                        <button
                            type="button"
                            className="tmc-time-close"
                            onClick={() => setActiveTimePicker(null)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="tmc-time-select-row">
                        <select
                            value={hour}
                            onChange={(event) => {
                                const next = event.target.value;
                                setHour(next);
                                applyTime(next, minute, period);
                            }}
                        >
                            {Array.from({ length: 12 }, (_, index) => String(index + 1)).map(
                                (item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )
                            )}
                        </select>

                        <select
                            value={minute}
                            onChange={(event) => {
                                const next = event.target.value;
                                setMinute(next);
                                applyTime(hour, next, period);
                            }}
                        >
                            {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map(
                                (item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )
                            )}
                        </select>

                        <select
                            value={period}
                            onChange={(event) => {
                                const next = event.target.value;
                                setPeriod(next);
                                applyTime(hour, minute, next);
                            }}
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>

                    <div className="tmc-time-preview">
                        Selected: <span>{`${hour}:${minute} ${period}`}</span>
                    </div>

                    <div className="tmc-time-actions">
                        <button
                            type="button"
                            className="tmc-time-done"
                            onClick={() => setActiveTimePicker(null)}
                        >
                            Done
                        </button>

                        <button
                            type="button"
                            className="tmc-time-clear"
                            onClick={clearTime}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function CoreCalendar({ profile }) {
    const todayString = formatDate(new Date());

    const [tasks, setTasks] = useState([]);
    const [monthDate, setMonthDate] = useState(new Date());
    const [activeTimePicker, setActiveTimePicker] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [form, setForm] = useState(getInitialTask(todayString));
    const [status, setStatus] = useState("");

    useEffect(() => {
        const unsubscribe = subscribeCalendarTasks(setTasks);
        return () => unsubscribe();
    }, []);

    const monthLabel = monthDate.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
    });

    const calendarCells = useMemo(() => getCalendarCells(monthDate), [monthDate]);

    const tasksByDate = useMemo(() => {
        return tasks.reduce((accumulator, task) => {
            if (!accumulator[task.date]) {
                accumulator[task.date] = [];
            }

            accumulator[task.date].push(task);
            return accumulator;
        }, {});
    }, [tasks]);

    const selectedTasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

    const changeMonth = (direction) => {
        setMonthDate((current) => {
            const next = new Date(current);
            next.setMonth(current.getMonth() + direction);
            return next;
        });
    };

    const selectDate = (dateString) => {
        if (selectedDate === dateString) {
            setSelectedDate(null);
            setEditingTask(null);
            setForm(getInitialTask(todayString));
            setStatus("");
            return;
        }

        setSelectedDate(dateString);
        setEditingTask(null);
        setForm(getInitialTask(dateString));
        setStatus("");
    };

    const editTask = (task) => {
        setEditingTask(task);
        setForm({
            date: task.date,
            title: task.title || "",
            type: task.type || "Task",
            startTime: task.startTime || "",
            endTime: task.endTime || "",
            location: task.location || "",
            description: task.description || "",
        });
        setStatus("");
    };

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSave = async (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setStatus("Add a task title first.");
            return;
        }

        try {
            if (editingTask) {
                await updateCalendarTask(editingTask.id, form, profile);
                setStatus("Task updated.");
            } else {
                await createCalendarTask(form, profile);
                setStatus("Task added.");
            }

            setEditingTask(null);
            setForm(getInitialTask(selectedDate));
        } catch {
            setStatus("Could not save task. Check Firebase rules.");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteCalendarTask(taskId);
            setStatus("Task deleted.");
            setEditingTask(null);
            setForm(getInitialTask(selectedDate));
        } catch {
            setStatus("Could not delete task.");
        }
    };

    return (
        <main
            className="core-admin-page"
            onClick={() => setActiveTimePicker(null)}
        >
            <button
                type="button"
                className="core-home-button"
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                ← Home
            </button>
            <header className="core-admin-header">
                <div>
                    <p className="eyebrow">Core Portal</p>
                    <h1>Event Calendar</h1>
                    <p>
                        Logged in as <strong>{profile.name}</strong> — {profile.role}
                    </p>
                </div>


                <button className="core-logout-button" onClick={logoutCoreMember}>
                    <LogOut size={18} />
                    Logout
                </button>
            </header>

            <section
                className={`core-calendar-layout ${
                    selectedDate ? "has-selected-date" : "calendar-only"
                }`}
            >
                <div className="core-calendar-card">
                    <div className="core-calendar-top">
                        <button onClick={() => changeMonth(-1)} aria-label="Previous month">
                            <ChevronLeft size={20} />
                        </button>

                        <h2>{monthLabel}</h2>

                        <button onClick={() => changeMonth(1)} aria-label="Next month">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="core-weekdays">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>

                    <div className="core-calendar-grid">
                        {calendarCells.map((date, index) => {
                            if (!date) {
                                return <div className="core-day empty" key={`empty-${index}`} />;
                            }

                            const dateString = formatDate(date);
                            const dayTasks = tasksByDate[dateString] || [];
                            const hasTasks = dayTasks.length > 0;
                            const isSelected = selectedDate === dateString;

                            return (
                                <button
                                    key={dateString}
                                    className={[
                                        "core-day",
                                        hasTasks ? "has-tasks" : "",
                                        isSelected ? "selected" : "",
                                    ].join(" ")}
                                    onClick={() => selectDate(dateString)}
                                >
                                    <span>{date.getDate()}</span>

                                    {hasTasks && <i>{dayTasks.length}</i>}

                                    {hasTasks && (
                                        <div className="core-hover-card">
                                            {dayTasks.slice(0, 3).map((task) => (
                                                <div key={task.id}>
                                                    <strong>{task.title}</strong>
                                                    <small>
                                                        Edited by {task.editedByName || "Core member"}
                                                    </small>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
                {selectedDate && (
                <aside className="core-detail-card">
                    <div className="core-detail-heading">
                        <div>
                            <p className="eyebrow">Selected Date</p>
                            <h2>{selectedDate}</h2>
                        </div>

                        <button
                            className="core-small-button"
                            onClick={() => {
                                setEditingTask(null);
                                setForm(getInitialTask(selectedDate));
                            }}
                        >
                            <Plus size={16} />
                            New
                        </button>
                    </div>

                    <div className="core-task-list">
                        {selectedTasks.length === 0 ? (
                            <p className="core-muted">No tasks added for this date yet.</p>
                        ) : (
                            selectedTasks.map((task) => (
                                <button
                                    className="core-task-item"
                                    key={task.id}
                                    onClick={() => editTask(task)}
                                >
                                    <span>{task.type}</span>
                                    <h3>{task.title}</h3>

                                    {(task.startTime || task.endTime) && (
                                        <p>
                                            {task.startTime || "—"} to {task.endTime || "—"}
                                        </p>
                                    )}

                                    {task.location && <p>{task.location}</p>}

                                    <small>
                                        Last edited by {task.editedByName || "Core member"}
                                    </small>
                                </button>
                            ))
                        )}
                    </div>

                    <form className="core-task-form" onSubmit={handleSave}>
                        <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>

                        <input
                            type="text"
                            placeholder="Task / event title"
                            value={form.title}
                            onChange={(event) => handleChange("title", event.target.value)}
                            required
                        />

                        <TaskTypeSelect
                            value={form.type}
                            onChange={(value) => handleChange("type", value)}
                        />

                        <div className="core-time-row">
                            <TimePicker12Hour
                                id="startTime"
                                label="Start time"
                                value={form.startTime}
                                onChange={(value) => handleChange("startTime", value)}
                                activeTimePicker={activeTimePicker}
                                setActiveTimePicker={setActiveTimePicker}
                            />

                            <TimePicker12Hour
                                id="endTime"
                                label="End time"
                                value={form.endTime}
                                onChange={(value) => handleChange("endTime", value)}
                                activeTimePicker={activeTimePicker}
                                setActiveTimePicker={setActiveTimePicker}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Location"
                            value={form.location}
                            onChange={(event) => handleChange("location", event.target.value)}
                        />

                        <textarea
                            placeholder="Full details, work, event flow, requirements..."
                            value={form.description}
                            onChange={(event) => handleChange("description", event.target.value)}
                        />

                        <button type="submit" className="core-save-button">
                            <CheckCircle2 size={18} />
                            <span>{editingTask ? "Update Task" : "Save Task"}</span>
                        </button>

                        {editingTask && (
                            <button
                                type="button"
                                className="core-delete-button"
                                onClick={() => {
                                    const confirmDelete = window.confirm(
                                        "Are you sure you want to delete this task?"
                                    );

                                    if (confirmDelete) {
                                        handleDelete(editingTask.id);
                                    }
                                }}
                            >
                                <Trash2 size={17} />
                                Delete Task
                            </button>
                        )}

                        {status && <p className="core-form-message">{status}</p>}
                    </form>
                </aside>
                )}
            </section>
        </main>
    );
}

function CorePasswordGate({ profile }) {
    const [checkingPasswordStatus, setCheckingPasswordStatus] = useState(true);
    const [mustChangePassword, setMustChangePassword] = useState(false);

    useEffect(() => {
        let isMounted = true;

        getCoreUserSettings(profile.email)
            .then((settings) => {
                if (!isMounted) return;

                setMustChangePassword(settings.mustChangePassword !== false);
            })
            .catch((error) => {
                console.error("Password status check error:", error);

                if (isMounted) {
                    setMustChangePassword(true);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setCheckingPasswordStatus(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [profile.email]);

    if (checkingPasswordStatus) {
        return (
            <main className="core-login-page">
                <div className="core-login-card">
                    <p>Checking password status...</p>
                </div>
            </main>
        );
    }

    if (mustChangePassword) {
        return (
            <ForcePasswordChange
                profile={profile}
                onDone={() => setMustChangePassword(false)}
            />
        );
    }

    return <CoreCalendar profile={profile} />;
}

export default function CoreAdmin() {
    const [authReady, setAuthReady] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = watchAuth((firebaseUser) => {
            setUser(firebaseUser);
            setAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    if (!authReady) {
        return (
            <main className="core-login-page">
                <div className="core-login-card">
                    <p>Loading core portal...</p>
                </div>
            </main>
        );
    }

    if (!user) {
        return <CoreLogin />;
    }

    const profile = getCoreProfile(user);

    if (!profile) {
        return (
            <main className="core-login-page">
                <div className="core-login-card">
                    <h1>Access denied</h1>
                    <p>
                        This email is not listed as a current core member. Contact the
                        website admin.
                    </p>
                    <button onClick={logoutCoreMember}>Logout</button>
                </div>
            </main>
        );
    }

    return <CorePasswordGate profile={profile} />;
}