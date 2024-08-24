package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.LiuyanbanEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.LiuyanbanView;


/**
 * 留言板
 *
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface LiuyanbanService extends IService<LiuyanbanEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<LiuyanbanView> selectListView(Wrapper<LiuyanbanEntity> wrapper);
   	
   	LiuyanbanView selectView(@Param("ew") Wrapper<LiuyanbanEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<LiuyanbanEntity> wrapper);
   	

}

