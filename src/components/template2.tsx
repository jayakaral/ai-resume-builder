import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeValues } from '@/lib/schema.zod';

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
        width: '100%'
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
        width: '100%',
        borderBottom: '1px solid black',
    },
    sectionContent: {
        marginBottom: 4,
    },
});

interface Props {
    resumeData: ResumeValues
}

const Template2 = ({
    resumeData
}: Props) => {
    const {
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        summary,
        workExperiences = [],
        educations = [],
        skills = [],
        projects = []
    } = resumeData;

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

                <View style={styles.section}>
                    <Text style={styles.subTitle}>Summary</Text>
                    <Text style={styles.text}>{summary}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {educations.map((education, index) => (
                        <View key={index} style={styles.sectionContent}>
                            <Text style={styles.text}>{education.degree}</Text>
                            <View style={styles.flex}>
                                <Text style={styles.text}>{education.school}</Text>
                                <Text style={styles.text}>{education.startDate} - {education.endDate}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    {workExperiences.map((experience, index) => (
                        <View key={index} style={styles.sectionContent}>
                            <Text style={styles.text}>{experience.position}</Text>
                            <View style={styles.flex}>
                                <Text style={styles.text}>{experience.company}</Text>
                                <Text style={styles.text}>{experience.startDate} - {experience.endDate}</Text>
                            </View>
                            <Text style={styles.text}>{experience.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {projects.map((project, index) => (
                        <View key={index} style={styles.sectionContent}>
                            <View style={styles.flex}>
                                <Text style={styles.text}>{project.title}</Text>
                                <Text style={styles.text}>{project.startDate} - {project.endDate ?? 'Present'}</Text>
                            </View>
                            <Text style={styles.text}>{project.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text style={styles.skillsText}>{skills.join(', ')}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default Template2;
