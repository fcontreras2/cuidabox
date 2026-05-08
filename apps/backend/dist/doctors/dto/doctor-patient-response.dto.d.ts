declare class PatientSnapshotDto {
    id: string;
    name: string;
    birthdate: string | null;
    gender: string | null;
}
export declare class DoctorPatientResponseDto {
    link_id: string;
    status: string;
    access_from: string;
    created_at: string;
    patient: PatientSnapshotDto;
}
export {};
