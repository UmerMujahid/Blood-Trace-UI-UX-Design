import { Icon } from "@iconify/react";
import Slider from "../components/Slider";
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import createDonorMarker from "../utils/createDonorMarker";
import { bloodCompatibility } from "../utils/data";
import { bloodDonors, bloodTypes } from "../utils/data";
import { useState, useEffect } from "react";
import L from "leaflet";
import ToggleSwitch from "../components/ToggleSwitch";

// const receipentBloodType = 'A+';



function Dashboard() {
    const [emergencyAlert, setEmergencyAlert] = useState(false);
    const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);
    const [searchRadius, setSearchRadius] = useState(10);
    const [showDonor, setShowDonor] = useState(undefined);
    const [receipentBloodType, setReceipentBloodType] = useState(undefined);

    // HCI Enhancements State
    const [requestForAnother, setRequestForAnother] = useState(false);
    const [customLocationStr, setCustomLocationStr] = useState("");
    const [tutorialStep, setTutorialStep] = useState(1);
    const [directRequestSent, setDirectRequestSent] = useState(false);
    
    // Additional HCI Principles (Accidental prevention, Help, etc.)
    const [showFilterHelp, setShowFilterHelp] = useState(false);
    const [showPatientHelp, setShowPatientHelp] = useState(false);
    const [showEmergencyHelp, setShowEmergencyHelp] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [countdownTime, setCountdownTime] = useState(5);
    const [isCountingDown, setIsCountingDown] = useState(false);

    let latitude = 31.5204
    let longitude = 74.3587

    receipentBloodType && navigator.geolocation.getCurrentPosition((pos) => {
        if (!requestForAnother) {
            latitude = pos.coords.latitude
            longitude = pos.coords.longitude
        }
    })

    if (requestForAnother && customLocationStr.length > 3) {
        // Simulate changing map location based on text input
        latitude = 31.4697;
        longitude = 74.2728; // Johar Town roughly
    }

    const yourLocationIcon = () => {

        return L.divIcon({
            className: 'custom-div-icon',
            // The HTML structure: Dot container + Label
            html: `
      <div class="flex flex-col items-center">
        <!-- The Pulsing Circle -->
        <div class="relative flex items-center justify-center w-10 h-10">
          <div class="absolute w-full h-full bg-blue-400 opacity-20 rounded-full"></div>
          <div class="pulse-dot w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>
        
        <!-- The "Your Location" Tag -->
        <div class="mt-1 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-lg shadow-md whitespace-nowrap">
          Your Location
        </div>
      </div>
    `,
            iconSize: [100, 60], // Size of the invisible container
            iconAnchor: [50, 30], // Point of the icon which will correspond to marker's location (Center)
        });

    }

    function SearchRadius({ searchRadius }) {

        const zoneOptions = {
            fillColor: '#f87171',
            color: '#dc2626',
            weight: 1,
            opacity: 0.7,
            fillOpacity: 0.3,
            dashArray: '5, 10'
        };

        return (
            <Circle
                center={[latitude, longitude]}
                pathOptions={zoneOptions}
                radius={searchRadius * 1000}
                interactive={false}
            />
        );

    }

    const compatibleDonors = receipentBloodType && bloodDonors.filter(donor => {
        if (bloodCompatibility[receipentBloodType].includes(donor.bloodType)) {

            const p1 = L.latLng(donor.geolocation[0], donor.geolocation[1]);
            const p2 = L.latLng(latitude, longitude);

            const distanceKm = p1.distanceTo(p2) / 1000;

            return distanceKm <= searchRadius ? true : false;
        }
        return false
    })

    //console.log(searchRadius)

    useEffect(() => {
        if (emergencyAlert || emergencyAlertSent) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'unset'
        }
    }, [emergencyAlert])

    useEffect(() => {
        let interval;
        if (isCountingDown) {
            interval = setInterval(() => {
                setCountdownTime(prev => {
                    if (prev <= 1) {
                        setIsCountingDown(false);
                        setEmergencyAlertSent(true);
                        clearInterval(interval);
                        return 5;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCountingDown]);

    const nameIcon = (name) => {


        let arr = name.split(' ')

        if (arr.length > 1) {
            arr = arr[0][0] + arr[1][0]


            return arr.toUpperCase()
        }
        return arr[0][0].toUpperCase()
    }


    return (
        <div className="relative dashboard-root-view">
            <div className="bg-dashboard-main p-4 pb-8 pr-4 flex flex-row gap-3.5">



                {receipentBloodType && (
                    <div className="fixed bottom-6 right-195 bg-white p-3 z-999 rounded-2xl">

                        <div className="text-blood-primary font-semibold  text-xl">
                            {compatibleDonors.length}
                        </div>

                        <div className="text-gray-700 text-[0.8rem] font-semibold">Donors found</div>

                    </div>
                )}



                <div className="w-80 shrink-0">
                    <div className="bg-white relative p-4 rounded-2xl shadow-md flex flex-col gap-3.5 border border-gray-100">

                        {/* Request for another patient block */}
                        <div className="relative flex flex-col gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-bold flex items-center gap-1">
                                        Request for another patient?
                                        <button 
                                            onClick={() => setShowPatientHelp(!showPatientHelp)} 
                                            className="text-gray-400 hover:text-blood-primary cursor-pointer focus:outline-none transition-colors"
                                            title="Contextual Help"
                                        >
                                            <Icon icon="ic:outline-help-outline" className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="text-[0.65rem] text-gray-500">Change location if not at site</div>
                                </div>
                                <div>
                                    <ToggleSwitch isOn={requestForAnother} setIsOn={setRequestForAnother} />
                                </div>
                            </div>

                            {showPatientHelp && (
                                <div className="absolute left-0 top-12 z-50 bg-white p-3 rounded-xl border border-gray-100 shadow-xl text-[0.7rem] text-gray-600 animate-in fade-in zoom-in-95 duration-200">
                                    <p className="font-bold text-gray-800 mb-1">Patient Location Override</p>
                                    Use this if you are requesting blood for a patient located in a different area. Type any city or landmark to shift the map search.
                                    <button onClick={() => setShowPatientHelp(false)} className="mt-2 text-blood-primary hover:underline font-bold block">Got it</button>
                                </div>
                            )}

                            {requestForAnother && (
                                <div className="mt-1 transition-all duration-300">
                                    <input 
                                        type="text" 
                                        value={customLocationStr}
                                        onChange={(e) => setCustomLocationStr(e.target.value)}
                                        placeholder="Enter Area / City (e.g. Johar Town)" 
                                        className="w-full bg-white border border-gray-300 p-2 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-blood-primary"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Smart Filter Heading Row */}
                        <div className="flex flex-row justify-between items-center">
                            <div className='flex flex-row gap-2 items-center'>
                                <div>
                                    <Icon icon="line-md:filter" className="h-4.5 w-4.5 text-blood-primary" />
                                </div>
                                <div className='font-bold text-xs flex items-center gap-1'>
                                    Smart filter
                                    <button 
                                        onClick={() => setShowFilterHelp(!showFilterHelp)} 
                                        className="text-gray-400 hover:text-blood-primary cursor-pointer focus:outline-none transition-colors"
                                        title="Filter Help"
                                    >
                                        <Icon icon="ic:outline-help-outline" className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Reset Filters Button */}
                            <button 
                                onClick={() => {
                                    setReceipentBloodType(undefined);
                                    setSearchRadius(10);
                                    setRequestForAnother(false);
                                    setCustomLocationStr("");
                                    setShowDonor(undefined);
                                }}
                                className="text-[0.7rem] text-blood-primary hover:text-red-700 font-bold hover:underline cursor-pointer flex items-center gap-1 transition-colors active:scale-95"
                            >
                                <Icon icon="mdi:refresh" className="w-3.5 h-3.5" />
                                Reset
                            </button>

                            {showFilterHelp && (
                                <div className="absolute left-4 top-24 z-50 bg-white p-3 rounded-xl border border-gray-100 shadow-xl text-[0.7rem] text-gray-600 animate-in fade-in zoom-in-95 duration-200 w-[240px]">
                                    <p className="font-bold text-gray-800 mb-1">Smart Filtering</p>
                                    Filters the donor network based on compatibility matches (Exact vs. Universal) and search radius to prevent errors.
                                    <button onClick={() => setShowFilterHelp(false)} className="mt-2 text-blood-primary hover:underline font-bold block">Got it</button>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <div className="text-gray-700 mt-2.5 text-xs font-medium">Required blood type</div>

                            <div className="grid mt-5 grid-cols-4 gap-1">

                                {bloodTypes.map((b, index) => {
                                    return (

                                        <div key={index} onClick={() => { setReceipentBloodType(b) }} className={`cursor-pointer  px-2.5 py-2.5 border-2 text-center rounded-xl font-medium text-[0.9rem]

                                    ${receipentBloodType == b ? 'bg-blood-primary text-white border-white' :
                                                ((receipentBloodType && bloodCompatibility[receipentBloodType].includes(b)) ? 'bg-blue-100 border-blue-300 text-blue-400' : 'bg-gray-200  border-gray-300')}
                                `}>{b}
                                        </div>

                                    )
                                })}

                            </div>

                            {/* Tutorial Step 1 Popup */}
                            {tutorialStep === 1 && (
                                <div className="absolute left-[calc(100%+24px)] top-0 z-10005 w-80 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-left-4 duration-300">
                                    <div className="absolute top-12 -left-2 w-4 h-4 bg-white rotate-45 border-l border-b border-gray-100"></div>
                                    <button onClick={() => setTutorialStep(0)} className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-100 rounded-full">
                                        <Icon icon="maki:cross" className="text-gray-500 w-3 h-3" />
                                    </button>
                                    <div className="flex gap-3 items-center mb-3">
                                        <div className="bg-blood-primary/10 p-2 rounded-full animate-pulse">
                                            <Icon icon="mdi:blood-bag" className="w-6 h-6 text-blood-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[0.95rem]">1. Choose Blood Type</h3>
                                            <div className="text-[0.7rem] text-gray-500 font-semibold">Step 1 of 4</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-xs leading-relaxed mb-4">
                                        Start by selecting the required blood type for the patient. Incompatible blood types are automatically dimmed to prevent critical errors.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <button onClick={() => setTutorialStep(0)} className="text-gray-400 hover:text-gray-600 text-xs font-bold">Skip</button>
                                        <button onClick={() => setTutorialStep(2)} className="bg-blood-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-md">Next Step</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <div className="text-gray-700 mt-3.5 text-[0.8rem] font-medium">Search Radius: <span className="text-blood-primary">{searchRadius} km</span></div>

                            <div className="mt-3">
                                <Slider value={searchRadius} setValue={setSearchRadius} />
                            </div>

                            <div className="text-gray-700 mt-2.5 text-xs font-medium">Quick Select</div>

                            <div className="grid grid-cols-3 mt-1.5 gap-2">

                                <div onClick={() => { setSearchRadius(5) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 5 ? ' text-white bg-blood-primary' : 'bg-gray-200'}`}>
                                    5 km
                                </div>

                                <div onClick={() => { setSearchRadius(10) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 10 ? 'bg-blood-primary text-white' : 'bg-gray-200'}`}>
                                    10 km
                                </div>

                                <div onClick={() => { setSearchRadius(25) }} className={`cursor-pointer text-center font-medium px-0.5 py-1.5 rounded-lg text-[0.7rem] ${searchRadius == 25 ? 'bg-blood-primary text-white' : 'bg-gray-200'}`}>
                                    25 km
                                </div>
                            </div>

                            {/* Tutorial Step 2 Popup */}
                            {tutorialStep === 2 && (
                                <div className="absolute left-[calc(100%+24px)] -top-10 z-10005 w-80 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-left-4 duration-300">
                                    <div className="absolute top-16 -left-2 w-4 h-4 bg-white rotate-45 border-l border-b border-gray-100"></div>
                                    <button onClick={() => setTutorialStep(0)} className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-100 rounded-full">
                                        <Icon icon="maki:cross" className="text-gray-500 w-3 h-3" />
                                    </button>
                                    <div className="flex gap-3 items-center mb-3">
                                        <div className="bg-blood-primary/10 p-2 rounded-full animate-pulse">
                                            <Icon icon="line-md:filter" className="w-6 h-6 text-blood-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[0.95rem]">2. Set Search Radius</h3>
                                            <div className="text-[0.7rem] text-gray-500 font-semibold">Step 2 of 4</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-xs leading-relaxed mb-4">
                                        Adjust the search radius to locate donors nearby. Toggle <strong>"Request for another patient?"</strong> above if you are requesting blood for a patient in a different location.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <button onClick={() => setTutorialStep(0)} className="text-gray-400 hover:text-gray-600 text-xs font-bold">Skip</button>
                                        <button onClick={() => setTutorialStep(3)} className="bg-blood-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-md">Next Step</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* How It Works Inline Section */}
                        <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl mt-1.5">
                            <div className="text-gray-700 text-xs font-bold flex items-center gap-1 mb-1">
                                <Icon icon="lucide:info" className="text-blood-primary w-4 h-4" />
                                How it works
                            </div>
                            <div className="text-gray-500 text-[0.7rem] leading-relaxed">
                                Choose the recipient's blood type and adjust radius. The algorithm immediately matches and maps all compatible live donors.
                            </div>
                        </div>

                    </div>
                </div>

                <div className="relative flex-1 py-2 h-[520px] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">

                    {/* Donor Status Floating Legend */}
                    <div className="absolute top-4 right-4 z-1001 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-lg flex flex-col gap-1.5 w-[170px] animate-in fade-in duration-300">
                        <div className="text-gray-800 text-[0.75rem] font-bold border-b border-gray-100 pb-1 mb-0.5">Donor Legend</div>
                        
                        <div className="flex flex-row items-center gap-2">
                            <Icon icon="ri:circle-fill" className="h-3 w-3 text-green-600" />
                            <span className="text-[0.68rem] text-gray-600 font-medium">Exact Match (Ready)</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Icon icon="ri:circle-fill" className="h-3 w-3 text-blue-600" />
                            <span className="text-[0.68rem] text-gray-600 font-medium">Compatible (Ready)</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Icon icon="ri:circle-fill" className="h-3 w-3 text-blood-primary" />
                            <span className="text-[0.68rem] text-gray-600 font-medium">Unavailable</span>
                        </div>
                    </div>

                    {/* Center Floating Emergency Alert Button */}
                    <div 
                        onClick={() => setEmergencyAlert(true)} 
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1001 px-6 py-3 bg-blood-primary hover:bg-red-700 active:scale-95 cursor-pointer text-white text-[0.9rem] font-bold flex flex-row gap-2.5 rounded-full justify-center items-center shadow-xl transition-all hover:shadow-2xl hover:translate-y-[-2px]"
                    >
                        <Icon icon="ix:about" className="h-5 w-5 animate-pulse" />
                        <span>Emergency Alert</span>
                    </div>

                    {/* Tutorial Step 4 Popup Floating above Emergency Button */}
                    {tutorialStep === 4 && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-18 z-10005 w-80 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100"></div>
                            <button onClick={() => setTutorialStep(0)} className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-100 rounded-full">
                                <Icon icon="maki:cross" className="text-gray-500 w-3 h-3" />
                            </button>
                            <div className="flex gap-3 items-center mb-3">
                                <div className="bg-blood-primary/10 p-2 rounded-full animate-pulse">
                                    <Icon icon="fluent:alert-urgent-24-regular" className="w-6 h-6 text-blood-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[0.95rem]">4. Broadcast Emergency</h3>
                                    <div className="text-[0.7rem] text-gray-500 font-semibold">Step 4 of 4</div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs leading-relaxed mb-4">
                                In a critical situation, click <strong>"Emergency Alert"</strong> to broadcast a push notification and SMS to all compatible donors within your radius simultaneously.
                            </p>
                            <div className="flex justify-between items-center">
                                <button onClick={() => setTutorialStep(0)} className="text-gray-400 hover:text-gray-600 text-xs font-bold">Skip</button>
                                <button onClick={() => setTutorialStep(0)} className="bg-blood-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-md">Get Started</button>
                            </div>
                        </div>
                    )}

                    {/* Tutorial Step 3 Popup */}
                    {tutorialStep === 3 && (
                        <div className="absolute left-8 top-12 z-10005 w-80 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-top-4 duration-300">
                            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-white rotate-45 border-l border-b border-gray-100 -translate-y-1/2"></div>
                            <button onClick={() => setTutorialStep(0)} className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-100 rounded-full">
                                <Icon icon="maki:cross" className="text-gray-500 w-3 h-3" />
                            </button>
                            <div className="flex gap-3 items-center mb-3">
                                <div className="bg-blood-primary/10 p-2 rounded-full animate-pulse">
                                    <Icon icon="mdi:map-marker-radius" className="w-6 h-6 text-blood-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[0.95rem]">3. Interactive Donor Map</h3>
                                    <div className="text-[0.7rem] text-gray-500 font-semibold">Step 3 of 4</div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs leading-relaxed mb-4">
                                The map displays interactive donor pins. Green indicates an exact blood match, and Blue shows a compatible universal donor. Click on any pin to view their profile and contact them directly.
                            </p>
                            <div className="flex justify-between items-center">
                                <button onClick={() => setTutorialStep(0)} className="text-gray-400 hover:text-gray-600 text-xs font-bold">Skip</button>
                                <button onClick={() => setTutorialStep(4)} className="bg-blood-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-all shadow-md">Next Step</button>
                            </div>
                        </div>
                    )}

                    <MapContainer center={[latitude, longitude]} zoom={9.7}>

                        <TileLayer
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {receipentBloodType && compatibleDonors.map(((donor) => {
                            return (
                                <Marker key={donor.id} position={donor.geolocation} icon={createDonorMarker(donor, receipentBloodType)}
                                    eventHandlers={{
                                        click: () => { setShowDonor(donor) }
                                    }}
                                />

                            )
                        }))}

                        <Marker key={crypto.randomUUID()} position={[latitude, longitude]} icon={yourLocationIcon()} />

                        <SearchRadius searchRadius={Number(searchRadius)} />


                    </MapContainer>



                </div>

                <div className=""> {/*Donor info window*/}

                    {showDonor && (
                        <div className="relative bg-white rounded-lg overflow-hidden">

                            <button onClick={() => { setShowDonor(undefined) }} className="cursor-pointer absolute top-3 right-3">
                                <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                            </button>

                            <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-100' : 'bg-blue-100') : 'bg-red-100'} flex flex-col p-3 py-5 gap-3 justify-center `}>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-600' : 'bg-blue-600') : 'bg-blood-primary'} text-white p-3 px-3.5 rounded-full font-bold`}>
                                        {nameIcon(showDonor.name)}
                                    </div>
                                    <div className='flex-col justify-center-safe'>
                                        <div className='font-bold'>{showDonor.name}</div>
                                        <div className='text-xs text-gray-600 -mt-1'>Blood Donor Profile</div>
                                    </div>
                                </div>


                                <div className="flex flex-row gap-2 items-center">


                                    <div className={`${showDonor.isAvailable ? (showDonor.bloodType == receipentBloodType ? 'bg-green-200 text-green-800 border-green-400' : 'bg-blue-200 text-blue-800 border-blue-400') : 'bg-red-200 text-red-800 border-red-400'} px-1.5 rounded-lg border inline-flex flex-row items-center`}>
                                        <div className="">
                                            <Icon icon="mingcute:heartbeat-line" className=" h-4 w-4" />
                                        </div>
                                        <div className="text-sm">
                                            {showDonor.isAvailable ? 'Available Now' : 'Not Available'}
                                        </div>
                                    </div>

                                    {(showDonor.bloodType == receipentBloodType) && (
                                        <div className="bg-green-200 text-green-800 px-1.5 rounded-lg border border-green-400">
                                            <div className="text-sm">
                                                Exact match
                                            </div>
                                        </div>
                                    )}




                                </div>
                            </div>

                            <div className="p-3 flex flex-col gap-3 items-center">
                                <div className="flex flex-col gap-1 p-2.5 justify-center bg-gray-200 rounded-xl w-60">
                                    <div className="flex flex-row gap-3 items-center">

                                        <div>
                                            <Icon icon="akar-icons:location" className="text-blood-primary h-5.5 w-5.5" />
                                        </div>
                                        <div className="font-semibold text-gray-700 text-[0.8rem]">
                                            Distance
                                        </div>


                                    </div>

                                    <div className=" ml-8.5 font-semibold">
                                        0.73 km away
                                    </div>
                                </div>

                                {showDonor.lastDonationDate && (
                                    <div className="flex flex-col gap-1 p-2.5 justify-center bg-gray-200 rounded-xl w-60">
                                        <div className="flex flex-row gap-3 items-center">

                                            <div>
                                                <Icon icon="uil:calendar" className="text-blood-primary h-5.5 w-5.5" />
                                            </div>
                                            <div className="font-semibold text-gray-700 text-[0.8rem]">
                                                Last Donation
                                            </div>


                                        </div>

                                        <div className=" ml-8.5 font-semibold">
                                            {showDonor.lastDonationDate}
                                        </div>
                                    </div>
                                )}


                                <div className="flex flex-col gap-1 p-2.5 justify-center bg-gray-200 rounded-xl w-60">
                                    <div className="flex flex-row gap-3 items-center">

                                        <div>
                                            <Icon icon="lucide:phone" className="text-blood-primary h-5.5 w-5.5" />
                                        </div>
                                        <div className="font-semibold text-gray-700 text-[0.8rem]">
                                            Contact Number
                                        </div>


                                    </div>

                                    <div className=" ml-8.5 font-semibold">
                                        {showDonor.contactNumber}
                                    </div>
                                </div>

                                <div onClick={() => setDirectRequestSent(true)} className="bg-blood-primary active:scale-95 cursor-pointer px-5 text-white text-[1rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center">
                                    <div>
                                        <Icon
                                            icon="tabler:send"
                                            className="w-5 h-5"
                                        />
                                    </div>
                                    <div className="font-bold">Send Direct Request</div>
                                </div>

                                <div className="text-gray-700 text-[0.6rem]">
                                    Please be courteous when contacting donors
                                </div>

                            </div>

                        </div>
                    )

                    }
                </div>

            </div>


            {emergencyAlert && (

                <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">

                    <div
                        className="absolute inset-0 bg-slate-900/60 transition-opacity"
                        onClick={() => { setEmergencyAlert(false); setEmergencyAlertSent(true) }}
                    />

                    <div className="relative overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide max-w-lg w-full  rounded-3xl bg-white">

                        <div className="relative flex gap-2 flex-row items-center p-6 border-b border-gray-100">

                            <div>
                                <Icon icon="emojione-monotone:warning" className="w-9 h-9 text-blood-primary animate-pulse" />
                            </div>

                            <div className="flex-1">
                                <div className="font-bold text-lg flex items-center gap-1.5">
                                    Emergency Broadcast
                                    <button 
                                        onClick={() => setShowEmergencyHelp(!showEmergencyHelp)} 
                                        className="text-gray-400 hover:text-blood-primary cursor-pointer focus:outline-none transition-colors"
                                        title="Broadcast Help"
                                    >
                                        <Icon icon="ic:outline-help-outline" className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-sm text-gray-700">Notify all compatible donors</div>
                            </div>

                            {showEmergencyHelp && (
                                <div className="absolute left-6 top-20 z-50 bg-white p-4 rounded-xl border border-gray-100 shadow-xl text-xs text-gray-600 animate-in fade-in zoom-in-95 duration-200 w-[calc(100%-48px)]">
                                    <p className="font-bold text-gray-800 mb-1">What is an Emergency Broadcast?</p>
                                    This initiates a priority alert to all compatible donors within your selected radius. An automated SMS and a high-priority push notification are sent immediately to secure fast responses.
                                    <button onClick={() => setShowEmergencyHelp(false)} className="mt-2 text-blood-primary hover:underline font-bold block">Got it</button>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-col gap-2 p-3 m-6  mt-8 justify-center border border-red-400 bg-red-200 rounded-xl">

                            <div className="flex justify-between text-[0.9rem] items-center">
                                <div>Required Blood Type</div>

                                <div className="text-blood-primary font-bold text-[1rem]">
                                    {receipentBloodType}
                                </div>
                            </div>

                            <div className="flex justify-between text-[0.9rem] items-center">

                                <div className="flex flex-row gap-2 justify-between items-center">
                                    <div><Icon icon="weui:location-outlined" className="w-5 h-5" /></div>
                                    <div>Search Radius</div>
                                </div>


                                <div className="font-bold text-[1rem]">
                                    {searchRadius} km
                                </div>
                            </div>


                            <div className="flex justify-between text-[0.9rem] items-center">

                                <div className="flex flex-row gap-2 justify-between items-center">
                                    <div><Icon icon="bi:people" className="w-5 h-5" /></div>
                                    <div>Compatible Donors</div>
                                </div>


                                <div className="font-bold text-[1rem] text-green-600">
                                    {compatibleDonors ? compatibleDonors.length : '0'}
                                </div>
                            </div>

                            <div className="flex justify-between text-[0.9rem] items-center">

                                <div className="flex flex-row gap-2 justify-between items-center">
                                    <div><Icon icon="iconamoon:clock-light" className="w-5 h-5" /></div>
                                    <div>Est. Response Time</div>
                                </div>


                                <div className="font-bold text-[1rem]">
                                    1-3 min
                                </div>
                            </div>

                        </div>

                        <div className=" m-6 p-3 text-[0.9rem] mt-8 justify-center border border-yellow-400 bg-yellow-50 rounded-xl">
                            <span className="font-semibold">Important:</span> This will send push notifications, SMS, and in-app alerts to all {compatibleDonors ? compatibleDonors.length : 0} compatible donors in your area. Please use this only for genuine emergencies
                        </div>


                        <div className="text-gray-700 font-bold m-6 mt-5">Message to be sent:</div>

                        <div className="flex flex-col gap-2 p-3 m-6 text-[0.9rem] mt-2 justify-center border border-gray-400 bg-gray-50 rounded-xl">
                            <div className="flex gap-2">
                                <div>
                                    <Icon icon="fluent:alert-on-24-regular" className="w-5 h-5 text-blood-primary" />
                                </div>
                                <div className="text-blood-primary text-[0.9rem]">URGENT BLOOD REQUEST</div>
                            </div>

                            <div className="flex flex-col -space-y-1 text-[0.8rem]">
                                <div>Blood Type Needed: {receipentBloodType}</div>
                                <div>Location: Within {searchRadius} km from your area</div>
                            </div>

                            <div className="text-[0.7rem]">Please respond if you are available to donate.</div>
                        </div>

                        <div className="sticky bottom-0 p-3 border-t border-gray-400 bg-white  grid grid-cols-2 gap-3 mt-5">

                            <div onClick={() => { setEmergencyAlert(false) }} className="px-3 py-2 border border-gray-400 text-gray-700 cursor-pointer font-semibold 
                         text-[0.9rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center">
                                <div>Cancel</div>
                            </div>

                            <div onClick={() => { setShowConfirmModal(true); }} className="px-3 py-2 bg-blood-primary cursor-pointer active:scale-95 transition-all font-semibold text-white text-[0.9rem] flex flex-row gap-5 p-2 rounded-xl justify-center items-center shadow-md hover:bg-red-700">
                                <div>Send Emergency Alert</div>
                            </div>

                        </div>

                        <button onClick={() => { setEmergencyAlert(false) }} className="cursor-pointer absolute top-3 right-5">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>

                    </div>
                </div>
            )}


            {emergencyAlertSent && (
                <div className="fixed inset-0 z-10000 flex justify-center items-center">

                    <div className="absolute inset-0 bg-slate-900/50 transition-opacity" />

                    <div className="relative w-full max-h-[90vh] max-w-lg bg-white p-6 rounded-3xl">

                        <div className="flex flex-col gap-2 justify-center items-center">
                            <Icon icon="charm:circle-tick" className="text-green-600 h-12 w-12" />
                            <div className="font-bold text-2xl">Alert Sent Successfully!</div>

                            <div className="text-gray-700 text-[0.9rem]">
                                {compatibleDonors ? compatibleDonors.length : '0'} donors have been notified. You should receive responses
                                shortly
                            </div>
                        </div>

                        <div className="bg-green-100 mt-5 text-green-600 p-4 text-[0.9rem] rounded-xl text-center">
                            We'll notify you when donor respond to your request.
                        </div>

                        <button onClick={() => { setEmergencyAlertSent(false) }} className="cursor-pointer absolute top-3 right-5">
                            <Icon icon="maki:cross" className="text-gray-600 h-3 w-3" />
                        </button>
                    </div>
                </div>
            )}
            {directRequestSent && showDonor && (
                <div className="fixed inset-0 z-10000 flex justify-center items-center">
                    <div className="absolute inset-0 bg-slate-900/50 transition-opacity" />
                    <div className="relative w-full max-h-[90vh] max-w-md bg-white p-6 rounded-3xl shadow-2xl m-4 animate-in zoom-in-95 duration-300">
                        <div className="flex flex-col gap-4 justify-center items-center text-center">
                            <Icon icon="charm:circle-tick" className="text-green-600 h-16 w-16" />
                            <div className="font-bold text-2xl">Direct Request Sent!</div>
                            <p className="text-gray-700 text-sm">
                                An urgent request has been sent directly to <span className="font-bold text-blood-primary">{showDonor.name}</span>.
                            </p>
                            <p className="text-xs text-gray-500">
                                They have been notified via in-app alert and SMS. You will be notified when they accept.
                            </p>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button 
                                onClick={() => { setDirectRequestSent(false); setShowDonor(undefined); }} 
                                className="bg-blood-primary text-white font-bold px-8 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all shadow-md"
                            >
                                Close Profile
                            </button>
                        </div>
                        <button onClick={() => setDirectRequestSent(false)} className="cursor-pointer absolute top-4 right-5 p-1 hover:bg-gray-100 rounded-full">
                            <Icon icon="maki:cross" className="text-gray-600 h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Two-Step Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-10100 flex justify-center items-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" />
                    <div className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl m-4 animate-in zoom-in-95 duration-200 border border-red-100">
                        <div className="flex flex-col gap-4 text-center items-center">
                            <div className="bg-red-50 p-3 rounded-full text-blood-primary animate-bounce">
                                <Icon icon="jam:triangle-danger" className="w-10 h-10" />
                            </div>
                            <h3 className="font-black text-xl text-gray-900">Confirm Emergency Broadcast</h3>
                            <p className="text-gray-600 text-sm">
                                You are about to notify <strong className="text-blood-primary text-base">{compatibleDonors ? compatibleDonors.length : 0} compatible donors</strong> within your search radius.
                            </p>
                            <div className="bg-red-50 p-3.5 rounded-xl text-red-800 text-xs font-semibold leading-relaxed">
                                WARNING: This sends real-time high-priority push notifications and automated SMS requests. Please use this only for genuine medical crises.
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setShowConfirmModal(false)} 
                                className="px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl cursor-pointer hover:bg-gray-50 transition-colors active:scale-95"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setEmergencyAlert(false);
                                    setIsCountingDown(true);
                                    setCountdownTime(5);
                                }}
                                className="px-4 py-2.5 bg-blood-primary hover:bg-red-700 text-white font-bold rounded-xl cursor-pointer transition-colors active:scale-95 shadow-md shadow-red-200"
                            >
                                Confirm & Broadcast
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Alert Countdown Overlay */}
            {isCountingDown && (
                <div className="fixed inset-0 z-10200 flex justify-center items-center">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" />
                    <div className="relative w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl m-4 text-center animate-in zoom-in-95 duration-300 border border-gray-100">
                        {/* Circular Progress Countdown Loader */}
                        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blood-primary rounded-full animate-spin border-t-transparent duration-1000"></div>
                            <span className="text-4xl font-black text-blood-primary animate-pulse">{countdownTime}</span>
                        </div>
                        
                        <h3 className="font-extrabold text-lg text-gray-900 mb-1">Broadcasting Emergency...</h3>
                        <p className="text-gray-500 text-xs mb-6">
                            Alert will be sent to compatible donors in {countdownTime} seconds.
                        </p>
                        
                        {/* ACCIDENTAL PREVENTION CANCEL BUTTON */}
                        <button 
                            onClick={() => {
                                setIsCountingDown(false);
                                // Show a localized toast-like alert confirming successful cancellation
                                alert("Broadcast successfully stopped. No notifications were sent.");
                            }}
                            className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg tracking-wide flex items-center justify-center gap-2"
                        >
                            <Icon icon="material-symbols:cancel" className="w-5 h-5" />
                            Cancel Alert Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Dashboard;