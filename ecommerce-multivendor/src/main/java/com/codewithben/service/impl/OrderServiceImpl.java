package com.codewithben.service.impl;

import com.codewithben.domain.OrderStatus;
import com.codewithben.domain.PaymentStatus;
import com.codewithben.model.*;
import com.codewithben.repository.AddressRepository;
import com.codewithben.repository.OrderItemRepository;
import com.codewithben.repository.OrderRepository;
import com.codewithben.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
        if(!user.getAddress().contains(shippingAddress)){
            user.getAddress().add(shippingAddress);
        }
        Address address = addressRepository.save(shippingAddress);

        // brand 1 => 4 shirt
        // brand 2 => 3 pants
        // brand 3 => 1 watch

        Map<Long,List<CartItem>> itemsBySeller = cart.getCartItems()
                .stream().collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId(), Collectors.toList()));
        Set<Order> orders = new HashSet<>();
        for(Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()){
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            int totalOrderPrice =items.stream().mapToInt(
                    CartItem:: getSellingPrice
            ).sum();

            int totalItem =items.stream().mapToInt(CartItem:: getQuantity).sum();

            Order createdOrder = new Order();
            createdOrder.setSellerId(sellerId);
            createdOrder.setUser(user);
            createdOrder.setTotalMrpPrice(totalOrderPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);
            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippingAddress(address);
            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            Order savedOrder = orderRepository.save(createdOrder);
            orders.add(savedOrder);


            List<OrderItem> orderItems = new ArrayList<>();

            for (CartItem item : items) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setMrpprice(item.getMrpPrice());
                orderItem.setSellingPrice(item.getSellingPrice());
                orderItem.setUserId(item.getUserId());
                orderItem.setSize(item.getSize());

                savedOrder.getOrderItems().add(orderItem);

                OrderItem savedOrderItem = orderItemRepository.save(orderItem);
                orderItems.add(savedOrderItem);



            }
        }



        return orders;
    }

    @Override
    public Order findOrderById(long id) throws Exception {
        return orderRepository.findById(id).orElseThrow
                (()-> new Exception(" order not found ...."));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStaus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStaus);
        return  orderRepository.save(order);

    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);

        if(user.getId().equals(order.getUser().getId())){
          throw new Exception("you don't have access to this order ....");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        return  orderRepository.save(order);
    }

    @Override
    public OrderItem getOrderItemById( Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(
                ()-> new Exception("order item does not exist"));
    }
}
