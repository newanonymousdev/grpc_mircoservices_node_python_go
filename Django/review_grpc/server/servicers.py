import review_grpc.proto.review_pb2_grpc as pb2_grpc
import review_grpc.proto.review_pb2 as pb2

class ReviewService(pb2_grpc.ReviewServiceServicer):
    # def Hello(self, request, context):
    #     return pb2.HelloReply(message="Xin chào từ gRPC Django!")
    def CreateReview(self, request, context):
        message = "Response from django"
        success = True
        # 👉 Xử lý logic ở đây (ví dụ kiểm tra, lưu DB, validate...)
        # Ở đây demo đơn giản: nếu có email + password thì success = True
        # if email and password:
        #     message = f"Đã tạo người dùng với email: {email}"
        #     success = True
        # else:
        #     message = "Thiếu email hoặc mật khẩu"
        #     success = False

        return pb2.ReviewResponse(message=message, success=success)

def grpc_handlers(server):
    pb2_grpc.add_ReviewServiceServicer_to_server(ReviewService(), server)
