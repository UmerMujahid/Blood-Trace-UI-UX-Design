import { Icon } from "@iconify/react";
import { bloodTypes } from "../utils/data";
import { useEffect, useRef, useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import Toast from "../components/Toast";
function RegisterDonor() {



    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [bloodType, setBloodType] = useState(undefined);
    const [lastDonationDate, setLastDonationDate] = useState("");
    const dateInputRef = useRef(undefined);
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);

    const [inCompleteSubmission, setInCompleteSubmission] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // HCI enhancements state
    const [medicalReport, setMedicalReport] = useState(null);
    const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
    const [isEligible, setIsEligible] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    // Form touched fields state
    const [touched, setTouched] = useState({});
    const [showReviewStep, setShowReviewStep] = useState(false);

    // Inline validation helpers
    const validateName = (val) => {
        if (!val || val.trim() === "") return "Full name is required.";
        if (!/^[a-zA-Z\s]{3,40}$/.test(val)) return "Please enter a valid full name (minimum 3 characters, alphabets only).";
        return null;
    };

    const validateContact = (val) => {
        if (!val || val.trim() === "") return "Phone number is required.";
        const cleanVal = val.replace(/[\s-]/g, '');
        if (!/^(03|\+923)\d{9}$/.test(cleanVal)) return "Must start with 03 or +923 and be a valid Pakistani mobile number (11 digits).";
        return null;
    };

    const validateCity = (val) => {
        if (!val || val.trim() === "") return "City is required.";
        if (val.trim().length < 2) return "City name must be at least 2 characters.";
        return null;
    };

    const validateArea = (val) => {
        if (!val || val.trim() === "") return "Area/Locality is required.";
        if (val.trim().length < 3) return "Area name must be at least 3 characters.";
        return null;
    };

    useEffect(() => {
        if (inCompleteSubmission) {
            document.body.style.overflow = 'hidden'
        }
        else
            document.body.style.overflow = 'unset'
    }, [inCompleteSubmission])

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mark all fields as touched to trigger inline error alerts
        const allTouched = { name: true, contactNumber: true, city: true, area: true };
        setTouched(allTouched);

        const nameErr = validateName(name);
        const contactErr = validateContact(contactNumber);
        const cityErr = validateCity(city);
        const areaErr = validateArea(area);

        if (!bloodType) {
            setToastMessage({ message: "Please select your Blood Type.", type: "error" });
            return;
        }

        if (nameErr || contactErr || cityErr || areaErr) {
            setInCompleteSubmission(true);
            return;
        }

        // Open Review screen for user review prior to absolute submit (HCI Error Prevention)
        setShowReviewStep(true);
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMedicalReport(file.name);
            setToastMessage({ message: `${file.name} uploaded successfully`, type: "success" });
            // Reset eligibility if new file is uploaded
            setIsEligible(null);
        }
    };

    const checkEligibility = () => {
        if (!medicalReport) {
            setToastMessage({ message: "Please upload a medical report first.", type: "error" });
            return;
        }
        setIsCheckingEligibility(true);
        
        // Simulate AI analysis delay
        setTimeout(() => {
            setIsCheckingEligibility(false);
            setIsEligible(true);
            setToastMessage({ message: "AI Analysis Complete: You are eligible to donate blood.", type: "success" });
        }, 2000);
    };

    const handleDateInputClick = () => {
        if (dateInputRef.current.showPicker) {
            dateInputRef.current.showPicker()
        }
    }

    return (
        <main className="relative flex flex-col gap-5 justify-center items-center p-4 bg-[#fdf0f0]">


            {!registrationSuccess && (
                <>
                    <div className="bg-blood-primary p-4 rounded-full">
                        <Icon icon="solar:user-plus-rounded-linear" className="text-white w-13 h-13" />
                    </div>

                    <div className="flex-col gap-2 justify-center items-center">
                        <div className="font-bold text-2xl text-center">Register as Blood Donor</div>
                        <div className="text-lg font-semibold text-gray-600">Join our community of life-savers and help people in need</div>
                    </div>

                    <form onSubmit={handleSubmit} action="" className="p-4 w-full max-w-2xl bg-white border border-gray-400 rounded-xl">

                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-xl">Personal Information</div>
                            <hr className="text-gray-700" />
                        </div>


                        <div className="mt-5 flex flex-col">
                            <label htmlFor="user-name" className="text-sm font-bold text-gray-700">Full Name</label>
                            <input 
                                onChange={(e) => { 
                                    setName(e.target.value); 
                                    setTouched(prev => ({...prev, name: true})); 
                                }} 
                                onBlur={() => setTouched(prev => ({...prev, name: true}))}
                                placeholder="Enter your full name" 
                                className={`bg-gray-200 mt-1 p-2.5 pl-4 rounded-lg placeholder:text-sm border transition-all duration-200 focus:bg-white focus:shadow-md outline-none
                                    ${touched.name ? (validateName(name) ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-green-500 focus:ring-2 focus:ring-green-100') : 'border-gray-300 focus:border-blood-primary'}`} 
                                id="user-name" 
                                type="text" 
                                value={name}
                            />
                            {touched.name && (
                                <div className={`text-xs mt-1.5 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200 ${validateName(name) ? 'text-red-500' : 'text-green-600'}`}>
                                    <Icon icon={validateName(name) ? 'carbon:warning-alt-filled' : 'charm:circle-tick'} className="w-4 h-4" />
                                    <span>{validateName(name) || "Verified name format!"}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 flex flex-col">
                            <label htmlFor="user-phone-number" className="text-sm font-bold text-gray-700">Phone Number</label>
                            <input 
                                onChange={(e) => { 
                                    setContactNumber(e.target.value); 
                                    setTouched(prev => ({...prev, contactNumber: true})); 
                                }} 
                                onBlur={() => setTouched(prev => ({...prev, contactNumber: true}))}
                                placeholder="e.g. 03001234567" 
                                className={`bg-gray-200 mt-1 p-2.5 pl-4 rounded-lg placeholder:text-sm border transition-all duration-200 focus:bg-white focus:shadow-md outline-none
                                    ${touched.contactNumber ? (validateContact(contactNumber) ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-green-500 focus:ring-2 focus:ring-green-100') : 'border-gray-300 focus:border-blood-primary'}`} 
                                id="user-phone-number" 
                                type="text" 
                                value={contactNumber}
                            />
                            {touched.contactNumber && (
                                <div className={`text-xs mt-1.5 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200 ${validateContact(contactNumber) ? 'text-red-500' : 'text-green-600'}`}>
                                    <Icon icon={validateContact(contactNumber) ? 'carbon:warning-alt-filled' : 'charm:circle-tick'} className="w-4 h-4" />
                                    <span>{validateContact(contactNumber) || "Verified mobile format!"}</span>
                                </div>
                            )}
                        </div>


                        <div className="mt-7 flex flex-col gap-2">
                            <div className="font-bold text-xl">Blood Information</div>
                            <hr className="text-gray-700" />
                        </div>

                        <div htmlFor="user-name" className="mt-3 text-lg">Blood Type</div>

                        <div>

                        </div>

                        <div className="flex justify-center">
                            <div className="grid mt-5 grid-cols-4 gap-y-10 gap-x-20">

                                {bloodTypes.map((b, index) => {
                                    return (

                                        <div key={index} onClick={() => { setBloodType(b) }} className={`flex justify-center items-center cursor-pointer w-18 h-18  px-3.5 py-2.5 border-2 text-center rounded-xl font-medium text-lg

                            ${bloodType == b ? 'bg-blood-primary text-white border-white' : 'bg-gray-200  border-gray-300'}
                            `}>{b}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>


                        <div className="mt-7 flex flex-col">
                            <label htmlFor="user-name" className="text-lg">Last Donation Date (Optional)</label>
                            <input ref={dateInputRef} onClick={handleDateInputClick} onChange={(e) => setLastDonationDate(e.target.value)} placeholder="mm/dd/yyyy" className="bg-gray-200 mt-1 p-2 pl-4 rounded-lg placeholder:text-sm" id="user-name" type="date" />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">Last Donation Date (Optional)</div>

                        <div className="mt-7 flex flex-col gap-2">
                            <div className="flex items-center gap-2">

                                <div>
                                    <Icon icon="akar-icons:location" className="w-5 h-5" />
                                </div>

                                <div className="font-bold text-xl">Location Information</div>
                            </div>
                            <hr className="text-gray-700" />
                        </div>


                        <div className="mt-5 grid grid-cols-2 gap-6 px-4">

                            <div className="flex flex-col">
                                <label htmlFor="user-city" className="text-sm font-bold text-gray-700">City</label>
                                <input 
                                    onChange={(e) => { 
                                        setCity(e.target.value); 
                                        setTouched(prev => ({...prev, city: true})); 
                                    }} 
                                    onBlur={() => setTouched(prev => ({...prev, city: true}))}
                                    placeholder="e.g. Lahore" 
                                    className={`bg-gray-200 mt-1 p-2.5 pl-4 rounded-lg placeholder:text-sm border transition-all duration-200 focus:bg-white focus:shadow-md outline-none
                                        ${touched.city ? (validateCity(city) ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-green-500 focus:ring-2 focus:ring-green-100') : 'border-gray-300 focus:border-blood-primary'}`} 
                                    id="user-city" 
                                    type="text" 
                                    value={city}
                                />
                                {touched.city && (
                                    <div className={`text-xs mt-1.5 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200 ${validateCity(city) ? 'text-red-500' : 'text-green-600'}`}>
                                        <Icon icon={validateCity(city) ? 'carbon:warning-alt-filled' : 'charm:circle-tick'} className="w-4 h-4" />
                                        <span>{validateCity(city) || "City verified!"}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="user-area" className="text-sm font-bold text-gray-700">Area/Locality</label>
                                <input 
                                    onChange={(e) => { 
                                        setArea(e.target.value); 
                                        setTouched(prev => ({...prev, area: true})); 
                                    }} 
                                    onBlur={() => setTouched(prev => ({...prev, area: true}))}
                                    placeholder="e.g. Johar Town" 
                                    className={`bg-gray-200 mt-1 p-2.5 pl-4 rounded-lg placeholder:text-sm border transition-all duration-200 focus:bg-white focus:shadow-md outline-none
                                        ${touched.area ? (validateArea(area) ? 'border-red-500 focus:ring-2 focus:ring-red-100' : 'border-green-500 focus:ring-2 focus:ring-green-100') : 'border-gray-300 focus:border-blood-primary'}`} 
                                    id="user-area" 
                                    type="text" 
                                    value={area}
                                />
                                {touched.area && (
                                    <div className={`text-xs mt-1.5 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200 ${validateArea(area) ? 'text-red-500' : 'text-green-600'}`}>
                                        <Icon icon={validateArea(area) ? 'carbon:warning-alt-filled' : 'charm:circle-tick'} className="w-4 h-4" />
                                        <span>{validateArea(area) || "Area registered!"}</span>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="mt-7 flex flex-col gap-2">
                            <div className="font-bold text-xl">Availability</div>
                            <hr className="text-gray-700" />
                        </div>

                        <div className="mt-5 bg-gray-300 p-3 rounded-xl flex justify-between items-center">
                            <div>
                                <div className="text-sm font-bold">Currently Available for Donation</div>
                                <div className="text-sm -mt-0.5 text-gray-600">You can update this anytime from your profile</div>
                            </div>

                            <div>
                                <ToggleSwitch isOn={isAvailable} setIsOn={setIsAvailable} />
                            </div>
                        </div>

                        {/* Medical Report Upload Section */}
                        <div className="mt-7 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div>
                                    <Icon icon="mdi:file-document-outline" className="w-5 h-5 text-blood-primary" />
                                </div>
                                <div className="font-bold text-xl">Medical Report (Optional)</div>
                            </div>
                            <hr className="text-gray-700" />
                        </div>

                        <div className="mt-5 p-4 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center bg-gray-50 transition-colors hover:bg-gray-100 relative">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileUpload}
                            />
                            <Icon icon="mdi:cloud-upload-outline" className="w-10 h-10 text-gray-500 mb-2" />
                            <div className="font-semibold text-gray-700 text-center">
                                {medicalReport ? medicalReport : "Click or drag to upload medical report"}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max. 5MB)</div>
                        </div>

                        <div className="mt-4">
                            <button 
                                type="button" 
                                onClick={checkEligibility}
                                disabled={isCheckingEligibility}
                                className={`w-full p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all duration-300
                                    ${isEligible === true ? 'bg-green-100 text-green-700 border-green-500' : 
                                    isCheckingEligibility ? 'bg-gray-200 text-gray-600 border-gray-400' : 
                                    'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 cursor-pointer'}`}
                            >
                                {isCheckingEligibility ? (
                                    <>
                                        <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />
                                        Analyzing Medical History...
                                    </>
                                ) : isEligible === true ? (
                                    <>
                                        <Icon icon="charm:circle-tick" className="w-5 h-5" />
                                        Eligible to Donate
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="fluent:brain-circuit-20-regular" className="w-5 h-5" />
                                        Check Donation Eligibility
                                    </>
                                )}
                            </button>
                        </div>


                        <div className="p-3 mt-5 rounded-xl bg-blue-200">

                            <div className="text-sm font-bold">Important Information</div>

                            <ul className="text-sm mt-3 list-disc list-outside ml-5">
                                <li>You must be 18-65 years old to donate blood</li>
                                <li>Minimum weight requirement is 50 kg</li>
                                <li>Wait at least 56 days between donations</li>
                                <li>Your contact information will only be shared with verified requests</li>
                            </ul>

                        </div>

                        <div className="">
                            <button type="submit" className="bg-blood-primary active:scale-95 cursor-pointer w-full mt-7 p-3 rounded-2xl">
                                <div className="flex items-center justify-center gap-3">
                                    <div><Icon icon="solar:user-plus-rounded-linear" className="text-white w-9 h-9" /></div>

                                    <div className="text-white text-xl font-bold">Complete Registration</div>
                                </div>
                            </button>
                        </div>
                    </form>
                </>
            )}

            {inCompleteSubmission && (
                <div className="fixed z-10000 inset-0 flex justify-center items-center p-4">

                    <div onClick={() => { setInCompleteSubmission(false) }} className="absolute inset-0 bg-gray-900/60" />

                    <div className="relative bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-5 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200 border border-red-100">
                        <button onClick={() => { setInCompleteSubmission(false) }} className="cursor-pointer absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full">
                            <Icon icon="maki:cross" className="text-gray-600 h-4 w-4" />
                        </button>

                        <div className="bg-red-50 p-3 rounded-full text-blood-primary">
                            <Icon icon="subway:missing" className="h-10 w-10" />
                        </div>

                        <div>
                            <h3 className="font-extrabold text-lg text-gray-900">Incomplete Submission</h3>
                            <p className="text-gray-500 text-xs mt-1">Please fill in all required fields highlighted in red before proceeding.</p>
                        </div>
                    </div>

                </div>
            )}

            {/* Review & Confirm Step Modal */}
            {showReviewStep && (
                <div className="fixed inset-0 z-10000 flex justify-center items-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity" />
                    
                    <div className="relative w-full max-w-lg bg-white p-7 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto scrollbar-hide border border-gray-100">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blood-primary/10 p-2.5 rounded-full text-blood-primary">
                                <Icon icon="icon-park-outline:doc-success" className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-gray-900">Review & Confirm Profile</h3>
                                <p className="text-xs text-gray-500">Please review your entered details before final database registration.</p>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-4">
                            
                            {/* Full Name & Phone */}
                            <div className="grid grid-cols-2 gap-4 pb-3.5 border-b border-gray-100">
                                <div>
                                    <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400">Full Name</div>
                                    <div className="text-sm font-extrabold text-gray-800 mt-0.5">{name}</div>
                                </div>
                                <div>
                                    <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400">Phone Number</div>
                                    <div className="text-sm font-extrabold text-gray-800 mt-0.5">{contactNumber}</div>
                                </div>
                            </div>

                            {/* Blood Type & Last Donation */}
                            <div className="grid grid-cols-2 gap-4 pb-3.5 border-b border-gray-100 items-center">
                                <div>
                                    <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400">Registered Blood Type</div>
                                    <div className="inline-flex items-center gap-1.5 mt-1 bg-red-50 text-blood-primary px-3 py-1 rounded-full font-black text-sm">
                                        <Icon icon="lucide:droplets" className="w-4 h-4" />
                                        {bloodType}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400">Last Donation Date</div>
                                    <div className="text-sm font-extrabold text-gray-800 mt-0.5">
                                        {lastDonationDate ? lastDonationDate : "None (First Time Donor)"}
                                    </div>
                                </div>
                            </div>

                            {/* Location & Availability */}
                            <div className="grid grid-cols-2 gap-4 pb-3.5 border-b border-gray-100">
                                <div>
                                    <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400">Location</div>
                                    <div className="text-sm font-extrabold text-gray-800 mt-0.5">{area}, {city}</div>
                                </div>
                                <div>
                                    <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400">Active Status</div>
                                    <div className="inline-flex items-center gap-1 mt-1 font-bold text-xs">
                                        <Icon icon="ri:circle-fill" className={`w-2.5 h-2.5 ${isAvailable ? 'text-green-600' : 'text-gray-400'}`} />
                                        <span className={isAvailable ? 'text-green-700' : 'text-gray-500'}>
                                            {isAvailable ? "Available to Donate" : "Unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Screening Status (AI eligibility) */}
                            <div>
                                <div className="text-[0.7rem] uppercase font-bold tracking-wider text-gray-400 mb-1.5">AI Eligibility Screening</div>
                                {medicalReport ? (
                                    <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${isEligible ? 'bg-green-50/50 border-green-100 text-green-800' : 'bg-blue-50/50 border-blue-100 text-blue-800'}`}>
                                        <Icon icon={isEligible ? 'charm:circle-tick' : 'carbon:warning-alt-filled'} className="w-5 h-5 shrink-0" />
                                        <div className="text-xs">
                                            <div className="font-bold">Medical Report: {medicalReport}</div>
                                            <div className="text-[0.68rem] text-gray-500 font-medium">
                                                {isEligible ? "Screened & Approved by BloodTrace AI eligibility scanner." : "Report uploaded, but AI verification was bypassed."}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-800">
                                        <Icon icon="ic:baseline-report-problem" className="w-5 h-5 shrink-0" />
                                        <div className="text-xs">
                                            <div className="font-bold">No Medical Report Uploaded</div>
                                            <div className="text-[0.68rem] text-gray-500 font-medium">Bypassed AI report screening. Manual eligibility screening will happen at donation center.</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="mt-6 grid grid-cols-2 gap-3.5">
                            <button 
                                onClick={() => setShowReviewStep(false)} 
                                className="px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl cursor-pointer hover:bg-gray-50 transition-colors active:scale-95"
                            >
                                Back & Edit
                            </button>
                            <button 
                                onClick={() => {
                                    setShowReviewStep(false);
                                    setRegistrationSuccess(true);
                                    setToastMessage({ message: "Registration successful!", type: "success" });
                                }}
                                className="px-4 py-3 bg-blood-primary hover:bg-red-700 text-white font-bold rounded-xl cursor-pointer transition-colors active:scale-95 shadow-md shadow-red-200 flex items-center justify-center gap-2"
                            >
                                <Icon icon="carbon:checkmark-filled" className="w-5 h-5" />
                                Submit Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {registrationSuccess && (

                <>
                    <div onClick={() => setRegistrationSuccess(false)} className="absolute inset-0" />
                    <div className="relative bg-white p-6 rounded-xl">

                        <div className="flex flex-col gap-5 justify-center items-center">
                            <div>
                                <Icon icon="charm:circle-tick" className="w-12 h-12 text-green-600" />
                            </div>

                            <div className="text-center">
                                <div className="text-xl font-bold">Registration Successful!</div>
                                <div className="max-w-150 px-20">Thank you for registering as a blood donor. Your
                                    profile is now active and you may receive requests
                                    from people in need.</div>
                            </div>
                        </div>

                        <div className="p-3 mt-5 rounded-xl bg-blue-200">

                            <div className="text-sm font-bold">Whats Next?</div>

                            <ul className="text-sm mt-2 list-disc list-outside ml-5">
                                <li> You'll receive notifications when someone needs your
                                    blood type</li>
                                <li>Keep your availability status updated</li>
                                <li>Respond promptly to emergency requests</li>
                                <li>Update your last donation date after each donation</li>
                            </ul>

                        </div>

                        <div className="">
                            <button onClick={() => setRegistrationSuccess(false)} className="bg-blood-primary active:scale-95 cursor-pointer w-full mt-7 p-3 rounded-2xl">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="text-white text-xl font-bold">Register Another Donor</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </>

            )}
            
            {toastMessage && (
                <Toast 
                    message={toastMessage.message} 
                    type={toastMessage.type} 
                    onClose={() => setToastMessage(null)} 
                />
            )}

        </main>
    )
}

export default RegisterDonor;