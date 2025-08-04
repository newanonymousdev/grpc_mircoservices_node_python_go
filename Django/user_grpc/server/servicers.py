import user_grpc.proto.user_pb2_grpc as pb2_grpc
import user_grpc.proto.user_pb2 as pb2

class UserService(pb2_grpc.UserServiceServicer):
    # def Hello(self, request, context):
    #     return pb2.HelloReply(message="Xin chào từ gRPC Django!")
    def CreateUser(self, request, context):
        email = request.email
        password = request.password

        # 👉 Xử lý logic ở đây (ví dụ kiểm tra, lưu DB, validate...)
        # Ở đây demo đơn giản: nếu có email + password thì success = True
        if email and password:
            message = f"Đã tạo người dùng với email: {email}"
            success = True
        else:
            message = "Thiếu email hoặc mật khẩu"
            success = False

        return pb2.UserResponse(message=message, success=success)

def grpc_handlers(server):
    pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
