/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { sidebarStructure } from "./SidebarStructure.js";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GrCatalog } from "react-icons/gr";

const Sidebar = ({ setExpand }) => {

    const [openedMenu, setOpenedMenu] = useState({});
    const [activeName, setActiveName] = useState("");
    const activeLink = window.location.pathname;

    const navigate = useNavigate();

    const listRef = useRef({});

    const [isExpand, setIsExpand] = useState(false);
    const [isExpandOnHover, setIsExpandOnHover] = useState(false);

    const handleHoverExpand = (value) => {
        if (!isExpand) {
            setIsExpandOnHover(value);
        }
    };

    const handleNavigate = (path) => {
        console.log(path);
        navigate(path);
        setActiveName(path);
    };

    const handleToggle = (name) => {
        const rootEl = name.split(".")[0];

        if (openedMenu[name]?.open === true) {
            setOpenedMenu((prevState) => ({
                ...prevState,
                [name]: {
                    open: false,
                    height: "0px"
                },
                [rootEl]: {
                    open: rootEl === name ? false : true,
                    height: `${(listRef.current[rootEl]?.scrollHeight || 0) -
                        (listRef.current[name]?.scrollHeight || 0)
                        }px`
                }
            }));
        } else {
            setOpenedMenu((prevState) => ({
                ...prevState,
                [name]: {
                    open: true,
                    height: `${listRef.current[name]?.scrollHeight || 0}px`
                },
                [rootEl]: {
                    open: true,
                    height: `${(listRef.current[rootEl]?.scrollHeight || 0) +
                        (listRef.current[name]?.scrollHeight || 0)
                        }px`
                }
            }));
        }
    };

    const generateIcon = (icon) => {
        var icons_map = {};

        icons_map["dasbor"] = (
            <MdDashboard className="text-xl" />
        );
        icons_map["catalogue"] = (
            <GrCatalog className="text-xl" />
        );
        icons_map["perusahaan"] = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-current"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M21.5367 20.5812H2.45436C1.92714 20.5812 1.5 21.0083 1.5 21.536C1.5 22.0628 1.92714 22.4899 2.45436 22.4899H21.5362C22.0635 22.4899 22.4906 22.0628 22.4906 21.536C22.4902 21.0083 22.063 20.5812 21.5367 20.5812Z"
                    fill="currentColor"
                />
                <path
                    d="M3.64772 18.1001C3.1205 18.1001 2.69336 18.5273 2.69336 19.0545C2.69336 19.5817 3.1205 20.0093 3.64772 20.0093H20.3446C20.8718 20.0093 21.2989 19.5817 21.2989 19.0545C21.2989 18.5273 20.8718 18.1001 20.3446 18.1001H20.1064V9.51266H20.3446C20.6086 9.51266 20.8213 9.29909 20.8213 9.03592C20.8213 8.77276 20.6077 8.55919 20.3446 8.55919H3.64772C3.38411 8.55919 3.17099 8.77276 3.17099 9.03592C3.17099 9.29909 3.38456 9.51266 3.64772 9.51266H3.88631V18.0997H3.64772V18.1001ZM18.1977 9.51266V18.0997H15.3355V9.51266H18.1977ZM13.4268 9.51266V18.0997H10.5646V9.51266H13.4268ZM5.79414 9.51266H8.65633V18.0997H5.79414V9.51266Z"
                    fill="currentColor"
                />
                <path
                    opacity="0.48"
                    d="M2.45438 7.70134H21.5363C21.5394 7.70134 21.543 7.70134 21.5456 7.70134C22.0733 7.70134 22.5 7.2742 22.5 6.74698C22.5 6.32788 22.2301 5.97268 21.8553 5.844L12.3876 1.58377C12.1387 1.47208 11.8541 1.47208 11.6048 1.58377L2.06298 5.87706C1.65238 6.06204 1.42674 6.50794 1.52146 6.94759C1.61574 7.38724 2.00445 7.70134 2.45438 7.70134Z"
                    fill="currentColor"
                />
            </svg>
        );
        icons_map["mou"] = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-current"
                viewBox="0 0 25 24"
                fill="none"
            >
                <path
                    opacity="0.48"
                    d="M17.7231 7.11493C18.4822 7.12263 19.5376 7.12593 20.4328 7.12263C20.8913 7.12153 21.1244 6.56823 20.8064 6.23493C19.6563 5.02713 17.5989 2.86563 16.4216 1.62923C16.096 1.28713 15.5264 1.52253 15.5264 1.99663V4.89623C15.5264 6.11283 16.5185 7.11493 17.7231 7.11493Z"
                    fill="currentColor"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6049 16.8291H8.68011C8.23358 16.8291 7.86328 16.4551 7.86328 16.0041C7.86328 15.5531 8.23358 15.1901 8.68011 15.1901H14.6049C15.0514 15.1901 15.4217 15.5531 15.4217 16.0041C15.4217 16.4551 15.0514 16.8291 14.6049 16.8291ZM8.68011 9.69006H12.3613C12.8078 9.69006 13.1781 10.0641 13.1781 10.5151C13.1781 10.9661 12.8078 11.3291 12.3613 11.3291H8.68011C8.23358 11.3291 7.86328 10.9661 7.86328 10.5151C7.86328 10.0641 8.23358 9.69006 8.68011 9.69006ZM20.9208 8.722C20.4525 8.722 19.8971 8.733 19.5595 8.733C19.0585 8.733 18.405 8.722 17.5773 8.722C15.5842 8.711 13.9397 7.061 13.9397 5.048V1.506C13.9397 1.231 13.7218 1 13.4387 1H7.62282C4.91094 1 2.71094 3.233 2.71094 5.961V17.819C2.71094 20.679 5.01985 23 7.85153 23H16.5208C19.2218 23 21.4109 20.789 21.4109 18.061V9.217C21.4109 8.942 21.1931 8.722 20.9208 8.722Z"
                    fill="currentColor"
                />
            </svg>
        );
        icons_map["pusatunduhdata"] = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-current"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1.586l-.293-.293a1 1 0 10-1.414 1.414l2 2 .002.002a.997.997 0 001.41 0l.002-.002 2-2a1 1 0 00-1.414-1.414l-.293.293V9z"
                />
            </svg>
        );
        return icons_map[icon];
    };

    const generateMenu = (item, index, recursive = 0) => {
        if (activeName === "" && activeLink.includes(item.link)) {
            setActiveName(item.name);
        }
        const classesActive = activeName === item.name ? "active" : "";

        return (
            <li key={index}>
                <a
                    role="button"
                    tabIndex={0}
                    id={item.id}
                    onClick={() => {
                        if ("child" in item) {
                            handleToggle(item.name);
                        } else if ("link" in item) {
                            handleNavigate(item.name);
                        }
                    }}
                    onKeyDown={(event) => {
                        const { code } = event;
                        if (code === "Space") {
                            if ("child" in item) {
                                handleToggle(item.name);
                            } else if ("link" in item) {
                                handleNavigate(item.name);
                            }
                        }
                    }}
                    className={[
                        "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
                        recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
                        activeName === item.name || activeName.split(".")[0] === item.name
                            ? `text-blue-600 font-semibold ${item.parent ? "bg-blue-200/20 " : "bg-transparent"
                            }`
                            : `text-slate-500 ${item.parent && ""}`,
                        "hover:bg-slate-300/20",
                        classesActive
                    ].join(" ")}
                >
                    <div className="flex items-center gap-3">
                        {item.icon ? (
                            item.icon === "dot" ? (
                                <div className="h-3 w-3 flex items-center justify-center">
                                    <div
                                        className={[
                                            `${classesActive ? "h-2 w-2" : "h-1 w-1"}`,
                                            "bg-current rounded-full duration-200"
                                        ].join(" ")}
                                    ></div>
                                </div>
                            ) : (
                                generateIcon(item.icon)
                            )
                        ) : null}
                        <div
                            className={`truncate ${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                                }`}
                        >
                            {item.title}
                        </div>
                    </div>
                    {"child" in item ? (
                        <div
                            className={`${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    ) : (
                        false
                    )}
                </a>
                {"child" in item ? (
                    <ul
                        ref={(el) => (listRef.current[item.name] = el)}
                        className={[
                            "overflow-hidden duration-300 ease-in-out",
                            isExpand ? "" : isExpandOnHover ? "" : "h-0"
                        ].join(" ")}
                        style={{ maxHeight: `${openedMenu[item.name]?.height || "0px"}` }}
                        key={item.name}
                    >
                        {item.child.map((value, idx) =>
                            generateMenu(value, idx, recursive + 1)
                        )}
                    </ul>
                ) : (
                    false
                )}
            </li>
        );
    };

    return (
        <nav
            role="navigation"
            className={[
                "bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0 mt-10 sm:mt-14",
                "duration-300 ease-in-out md:fixed md:translate-x-0",
                `${isExpand
                    ? "bg-slate-50 w-72"
                    : isExpandOnHover
                        ? "bg-slate-50/70 w-72 backdrop-blur-md"
                        : "bg-slate-50 w-20"
                }`
            ].join(" ")}
        >
            <button
                className="absolute z-30 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
                onClick={() => {
                    setIsExpand(!isExpand);
                    setExpand(!isExpand);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isExpand ? "rotate-0" : "rotate-180"
                        } transform duration-500 h-4 w-4`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                onMouseEnter={() => handleHoverExpand(true)}
                onMouseLeave={() => handleHoverExpand(false)}
                className={`relative h-screen overflow-hidden`}
            >
                <SimpleBar style={{ height: "100%" }} autoHide timeout={100}>
                    <div className="text-slate-500">
                        {/* <div className="my-8 flex flex-col items-center h-44 overflow-x-hidden">
                            <a
                                href={link}
                                className={`text-center flex flex-col items-center justify-center`}
                            >
                                <div
                                    className={`rounded-full border-4 border-white overflow-hidden duration-300 ${isExpand
                                        ? "h-28 w-28"
                                        : isExpandOnHover
                                            ? "h-28 w-28"
                                            : "h-12 w-12"
                                        }`}
                                >
                                    <img src={profilePic} className="block" alt="" />
                                </div>
                                <div
                                    className={`text-base font-semibold text-slate-700 mt-3 truncate duration-300 ${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                                        }`}
                                >
                                    {username}
                                </div>
                                <div
                                    className={`duration-300 text-sm text-slate-500 truncate ${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                                        }`}
                                >
                                    {company}
                                </div>
                            </a>
                        </div> */}

                        <div className="mt-3 mb-10 p-0">
                            <ul className="list-none text-sm font-normal px-3">
                                {sidebarStructure.map((item, index) =>
                                    generateMenu(item, index)
                                )}
                            </ul>
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </nav>
    );
};

export default Sidebar;
