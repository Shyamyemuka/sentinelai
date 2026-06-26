# backend/schemas.py
from pydantic import BaseModel, Field
import numpy as np

class LoginRequest(BaseModel):
    username: str
    password: str

class FlowSchema(BaseModel):
    destination_port: int = Field(..., alias='Destination Port', ge=0, le=65535)
    flow_duration: float = Field(..., alias='Flow Duration')
    total_fwd_packets: float = Field(..., alias='Total Fwd Packets', ge=0.0)
    total_backward_packets: float = Field(..., alias='Total Backward Packets', ge=0.0)
    total_length_of_fwd_packets: float = Field(..., alias='Total Length of Fwd Packets', ge=0.0)
    total_length_of_bwd_packets: float = Field(..., alias='Total Length of Bwd Packets', ge=0.0)
    fwd_packet_length_max: float = Field(..., alias='Fwd Packet Length Max', ge=0.0)
    fwd_packet_length_min: float = Field(..., alias='Fwd Packet Length Min', ge=0.0)
    fwd_packet_length_mean: float = Field(..., alias='Fwd Packet Length Mean', ge=0.0)
    fwd_packet_length_std: float = Field(..., alias='Fwd Packet Length Std', ge=0.0)
    bwd_packet_length_max: float = Field(..., alias='Bwd Packet Length Max', ge=0.0)
    bwd_packet_length_min: float = Field(..., alias='Bwd Packet Length Min', ge=0.0)
    bwd_packet_length_mean: float = Field(..., alias='Bwd Packet Length Mean', ge=0.0)
    bwd_packet_length_std: float = Field(..., alias='Bwd Packet Length Std', ge=0.0)
    flow_bytes_s: float = Field(..., alias='Flow Bytes/s', ge=0.0)
    flow_packets_s: float = Field(..., alias='Flow Packets/s', ge=0.0)
    flow_iat_mean: float = Field(..., alias='Flow IAT Mean')
    flow_iat_std: float = Field(..., alias='Flow IAT Std')
    flow_iat_max: float = Field(..., alias='Flow IAT Max')
    flow_iat_min: float = Field(..., alias='Flow IAT Min')
    fwd_iat_total: float = Field(..., alias='Fwd IAT Total')
    fwd_iat_mean: float = Field(..., alias='Fwd IAT Mean')
    fwd_iat_std: float = Field(..., alias='Fwd IAT Std')
    fwd_iat_max: float = Field(..., alias='Fwd IAT Max')
    fwd_iat_min: float = Field(..., alias='Fwd IAT Min')
    bwd_iat_total: float = Field(..., alias='Bwd IAT Total')
    bwd_iat_mean: float = Field(..., alias='Bwd IAT Mean')
    bwd_iat_std: float = Field(..., alias='Bwd IAT Std')
    bwd_iat_max: float = Field(..., alias='Bwd IAT Max')
    bwd_iat_min: float = Field(..., alias='Bwd IAT Min')
    fwd_psh_flags: int = Field(..., alias='Fwd PSH Flags', ge=0)
    bwd_psh_flags: int = Field(..., alias='Bwd PSH Flags', ge=0)
    fwd_urg_flags: int = Field(..., alias='Fwd URG Flags', ge=0)
    bwd_urg_flags: int = Field(..., alias='Bwd URG Flags', ge=0)
    fwd_header_length: float = Field(..., alias='Fwd Header Length')
    bwd_header_length: float = Field(..., alias='Bwd Header Length')
    fwd_packets_s: float = Field(..., alias='Fwd Packets/s', ge=0.0)
    bwd_packets_s: float = Field(..., alias='Bwd Packets/s', ge=0.0)
    min_packet_length: float = Field(..., alias='Min Packet Length', ge=0.0)
    max_packet_length: float = Field(..., alias='Max Packet Length', ge=0.0)
    packet_length_mean: float = Field(..., alias='Packet Length Mean', ge=0.0)
    packet_length_std: float = Field(..., alias='Packet Length Std', ge=0.0)
    packet_length_variance: float = Field(..., alias='Packet Length Variance', ge=0.0)
    fin_flag_count: int = Field(..., alias='FIN Flag Count', ge=0)
    syn_flag_count: int = Field(..., alias='SYN Flag Count', ge=0)
    rst_flag_count: int = Field(..., alias='RST Flag Count', ge=0)
    psh_flag_count: int = Field(..., alias='PSH Flag Count', ge=0)
    ack_flag_count: int = Field(..., alias='ACK Flag Count', ge=0)
    urg_flag_count: int = Field(..., alias='URG Flag Count', ge=0)
    cwe_flag_count: int = Field(..., alias='CWE Flag Count', ge=0)
    ece_flag_count: int = Field(..., alias='ECE Flag Count', ge=0)
    down_up_ratio: float = Field(..., alias='Down/Up Ratio')
    average_packet_size: float = Field(..., alias='Average Packet Size', ge=0.0)
    avg_fwd_segment_size: float = Field(..., alias='Avg Fwd Segment Size')
    avg_bwd_segment_size: float = Field(..., alias='Avg Bwd Segment Size')
    fwd_header_length_1: float = Field(..., alias='Fwd Header Length.1')
    fwd_avg_bytes_bulk: float = Field(..., alias='Fwd Avg Bytes/Bulk', ge=0.0)
    fwd_avg_packets_bulk: float = Field(..., alias='Fwd Avg Packets/Bulk', ge=0.0)
    fwd_avg_bulk_rate: float = Field(..., alias='Fwd Avg Bulk Rate')
    bwd_avg_bytes_bulk: float = Field(..., alias='Bwd Avg Bytes/Bulk', ge=0.0)
    bwd_avg_packets_bulk: float = Field(..., alias='Bwd Avg Packets/Bulk', ge=0.0)
    bwd_avg_bulk_rate: float = Field(..., alias='Bwd Avg Bulk Rate')
    subflow_fwd_packets: float = Field(..., alias='Subflow Fwd Packets', ge=0.0)
    subflow_fwd_bytes: float = Field(..., alias='Subflow Fwd Bytes', ge=0.0)
    subflow_bwd_packets: float = Field(..., alias='Subflow Bwd Packets', ge=0.0)
    subflow_bwd_bytes: float = Field(..., alias='Subflow Bwd Bytes', ge=0.0)
    init_win_bytes_forward: float = Field(..., alias='Init_Win_bytes_forward', ge=-1.0)
    init_win_bytes_backward: float = Field(..., alias='Init_Win_bytes_backward', ge=-1.0)
    act_data_pkt_fwd: float = Field(..., alias='act_data_pkt_fwd')
    min_seg_size_forward: float = Field(..., alias='min_seg_size_forward')
    active_mean: float = Field(..., alias='Active Mean')
    active_std: float = Field(..., alias='Active Std')
    active_max: float = Field(..., alias='Active Max')
    active_min: float = Field(..., alias='Active Min')
    idle_mean: float = Field(..., alias='Idle Mean')
    idle_std: float = Field(..., alias='Idle Std')
    idle_max: float = Field(..., alias='Idle Max')
    idle_min: float = Field(..., alias='Idle Min')

    def to_feature_array(self) -> np.ndarray:
        return np.array([[
            self.destination_port,
            self.flow_duration,
            self.total_fwd_packets,
            self.total_backward_packets,
            self.total_length_of_fwd_packets,
            self.total_length_of_bwd_packets,
            self.fwd_packet_length_max,
            self.fwd_packet_length_min,
            self.fwd_packet_length_mean,
            self.fwd_packet_length_std,
            self.bwd_packet_length_max,
            self.bwd_packet_length_min,
            self.bwd_packet_length_mean,
            self.bwd_packet_length_std,
            self.flow_bytes_s,
            self.flow_packets_s,
            self.flow_iat_mean,
            self.flow_iat_std,
            self.flow_iat_max,
            self.flow_iat_min,
            self.fwd_iat_total,
            self.fwd_iat_mean,
            self.fwd_iat_std,
            self.fwd_iat_max,
            self.fwd_iat_min,
            self.bwd_iat_total,
            self.bwd_iat_mean,
            self.bwd_iat_std,
            self.bwd_iat_max,
            self.bwd_iat_min,
            self.fwd_psh_flags,
            self.bwd_psh_flags,
            self.fwd_urg_flags,
            self.bwd_urg_flags,
            self.fwd_header_length,
            self.bwd_header_length,
            self.fwd_packets_s,
            self.bwd_packets_s,
            self.min_packet_length,
            self.max_packet_length,
            self.packet_length_mean,
            self.packet_length_std,
            self.packet_length_variance,
            self.fin_flag_count,
            self.syn_flag_count,
            self.rst_flag_count,
            self.psh_flag_count,
            self.ack_flag_count,
            self.urg_flag_count,
            self.cwe_flag_count,
            self.ece_flag_count,
            self.down_up_ratio,
            self.average_packet_size,
            self.avg_fwd_segment_size,
            self.avg_bwd_segment_size,
            self.fwd_header_length_1,
            self.fwd_avg_bytes_bulk,
            self.fwd_avg_packets_bulk,
            self.fwd_avg_bulk_rate,
            self.bwd_avg_bytes_bulk,
            self.bwd_avg_packets_bulk,
            self.bwd_avg_bulk_rate,
            self.subflow_fwd_packets,
            self.subflow_fwd_bytes,
            self.subflow_bwd_packets,
            self.subflow_bwd_bytes,
            self.init_win_bytes_forward,
            self.init_win_bytes_backward,
            self.act_data_pkt_fwd,
            self.min_seg_size_forward,
            self.active_mean,
            self.active_std,
            self.active_max,
            self.active_min,
            self.idle_mean,
            self.idle_std,
            self.idle_max,
            self.idle_min,
        ]], dtype=np.float64)

    model_config = {
        'extra': 'forbid',
        'populate_by_name': True
    }
