import React from 'react';
import { MdListAlt, MdOutlineAssignment, MdOutlineModeEditOutline,
    MdAddCircleOutline, MdEditOff, MdHome, MdAssignmentInd, MdClose,
    MdAdb, MdPeople, MdArrowDropDown, MdArrowDropUp, MdLocalHospital, MdAnalytics} from 'react-icons/md';

export const SidebarDataAdmin = [
    {
        title: 'Home',
        path: '/main',
        icon: <MdHome/>
    },
    {
        title: 'Employee',
        path: '/main',
        icon: <MdPeople />,
        iconClosed: <MdArrowDropDown />,
        iconOpened: <MdArrowDropUp />,

        subNav: [
            {
                title: 'Transaction',
                path: '/searchemployeetransaction',
                icon: <MdAssignmentInd />
            },
            {
                title: 'Add New Employee',
                path: '/addemployee',
                icon: <MdAddCircleOutline />
            },
            {
                title: 'Edit Employee',
                path: '/searcheditemployee',
                icon: <MdOutlineModeEditOutline />
            },
            {
                title: 'Edit Entitlement',
                path: '/selectgrade',
                icon: <MdOutlineModeEditOutline />
            },
        ]
    },
    {
        title: 'Admin',
        path: '/main',
        icon: <MdAdb />,
        iconClosed: <MdArrowDropDown />,
        iconOpened: <MdArrowDropUp />,

        subNav: [
            {
                title: 'Add New Admin',
                path: '/addadmin',
                icon: <MdAddCircleOutline />
            },
            {
                title: 'List of Admin',
                path: '/AdminList',
                icon: <MdListAlt />
            },
        ]
    },
    {
    title: 'Clinic',
    path: '/main',
    icon: <MdLocalHospital />,
    iconClosed: <MdArrowDropDown />,
    iconOpened: <MdArrowDropUp />,

    subNav: [
        {
            title: 'Add New Clinic',
            path: '/addclinic',
            icon: <MdAddCircleOutline />
        },
        {
            title: 'List of Clinic',
            path: '/ClinicList',
            icon: <MdListAlt />
        },
    ]
    },
    {
        title: 'Report',
        path: '/main',
        icon: <MdAnalytics />,
        iconClosed: <MdArrowDropDown />,
        iconOpened: <MdArrowDropUp />,

        subNav: [
            {
                title: 'Report by Department',
                path: '/ReportByDepartment',
                icon: <MdOutlineAssignment />
            },
            {
                title: 'Report by Medical',
                path: '/ReportByMedical',
                icon: <MdOutlineAssignment />
            },
            {
                title: 'Report by Clinic',
                path: '/ReportByClinic',
                icon: <MdOutlineAssignment />
            },
        ]
    },
    {
        title: 'Close Transaction',
        path: '/CloseTrans',
        icon: <MdClose />
    },

];

export const SidebarDataClinic = [
    {
        title: 'Home',
        path: '/clinicmainmenu',
        icon: <MdHome />
    },
    {
        title: 'New Transaction',
        path: 'clinicSearchEmp',
        icon: <MdAssignmentInd />
    },
    {
        title: 'Report',
        path: '/clinicReport',
        icon: <MdEditOff />
    },

];
