declare class DoctorInfoDto {
    id: string;
    name: string;
    email: string;
    specialty_key: string | null;
}
export declare class PatientDoctorResponseDto {
    id: string;
    patient_id: string;
    status: string;
    invited_by: string;
    access_from: string;
    created_at: string;
    doctor: DoctorInfoDto;
}
export {};
