import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/schema.zod';
import { showMonthYear } from '@/lib/utils';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subTitle: {
        fontSize: 18,
        borderBottom: '1px solid black',
        marginBottom: 4,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 10,
    },
    skillsText: {
        fontSize: 10,
        textAlign: 'justify',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        borderBottom: '1px solid black',
    },
    sectionContent: {
        marginBottom: 4,
    },
});

interface Props {
    resumeData: ResumeValues;
}

const Template2 = ({
    resumeData
}: Props) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        summary,
        skills = [],
        fieldsOrder = [],
    } = resumeData;

    const educations = resumeData.educations?.map(edu => ({
        ...edu,
        startDate: showMonthYear(edu.startDate),
        endDate: showMonthYear(edu.endDate),
    })) || [];

    const workExperiences = resumeData.workExperiences?.map(exp => ({
        ...exp,
        startDate: showMonthYear(exp.startDate),
        endDate: showMonthYear(exp.endDate),
    })) || [];

    const projects = resumeData.projects?.map(project => ({
        ...project,
        startDate: showMonthYear(project.startDate),
        endDate: showMonthYear(project.endDate),
    })) || [];

    const customSections = resumeData.customSections.map(section => ({
        ...section,
        items: section.items.map(item => ({
            ...item,
            startDate: showMonthYear(item.startDate),
            endDate: showMonthYear(item.endDate),
        }))
    })) || [];

    return (
        <Document>
            <Page size={'A4'} style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{firstName} {lastName}</Text>
                    <View style={styles.flex}>
                        {email && <Text style={styles.text}>{email}</Text>}
                        {phone && <Text style={styles.text}>{phone}</Text>}
                    </View>
                </View>

                {summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.text}>{summary}</Text>
                    </View>
                )}

                {fieldsOrder.map((field, index) => (
                    <View key={index} style={styles.section}>
                        {field === "workExperiences" && workExperiences.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Work Experience</Text>
                                {workExperiences.map((experience, idx) => (
                                    <View key={idx} style={styles.sectionContent}>
                                        <Text style={styles.text}>{experience.position}</Text>
                                        <View style={styles.flex}>
                                            <Text style={styles.text}>{experience.company}</Text>
                                            <Text style={styles.text}>{experience.startDate} - {experience.endDate}</Text>
                                        </View>
                                        <Text style={styles.text}>{experience.description}</Text>
                                    </View>
                                ))}
                            </>
                        )}

                        {field === "educations" && educations.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {educations.map((education, idx) => (
                                    <View key={idx} style={styles.sectionContent}>
                                        <Text style={styles.text}>{education.degree}</Text>
                                        <View style={styles.flex}>
                                            <Text style={styles.text}>{education.school}</Text>
                                            <Text style={styles.text}>{education.startDate} - {education.endDate}</Text>
                                        </View>
                                    </View>
                                ))}
                            </>
                        )}

                        {field === "skills" && skills.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <Text style={styles.skillsText}>{skills.map(s => s.skill).filter(Boolean).join(', ')}</Text>
                            </>
                        )}

                        {field === "projects" && projects.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Projects</Text>
                                {projects.map((project, idx) => (
                                    <View key={idx} style={styles.sectionContent}>
                                        <View style={styles.flex}>
                                            <Text style={styles.text}>{project.title}</Text>
                                            <Text style={styles.text}>{project.startDate} - {project.endDate || 'Present'}</Text>
                                        </View>
                                        <Text style={styles.text}>{project.description}</Text>
                                    </View>
                                ))}
                            </>
                        )}
                    </View>
                ))}

                {customSections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.items.map((item, idx) => (
                            <View key={idx} style={styles.sectionContent}>
                                <Text style={styles.text}>{item.title}</Text>
                                <View style={styles.flex}>
                                    <Text style={styles.text}>{item.startDate} - {item.endDate}</Text>
                                </View>
                                <Text style={styles.text}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default Template2;
