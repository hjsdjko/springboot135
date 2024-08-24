package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.DiscussnongchanpinEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiscussnongchanpinView;


/**
 * 农产品评论表
 *
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface DiscussnongchanpinService extends IService<DiscussnongchanpinEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<DiscussnongchanpinView> selectListView(Wrapper<DiscussnongchanpinEntity> wrapper);
   	
   	DiscussnongchanpinView selectView(@Param("ew") Wrapper<DiscussnongchanpinEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<DiscussnongchanpinEntity> wrapper);
   	

}

